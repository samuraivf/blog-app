import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'

import { Post } from './posts.entity'
import { Tag } from 'src/tags/tags.entity'

import { CreatePostDto } from './dto/create-post.dto'
import { InfoPost, PostDto, PostWithContent } from './dto/post.dto'
import { AddCommentDto } from './dto/add-comment.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { UserData, UserDto } from './../auth/dto/user'

import { DBOrder } from 'src/enums/db-order'

import { TagsService } from './../tags/tags.service'
import { CommentsService } from './../comments/comments.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly userService: UserService,
        private readonly tagService: TagsService,
        private readonly commentsService: CommentsService,
    ) {}

    private async findPostByBuilder(id: number): Promise<Post> {
        return await this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .leftJoinAndSelect('post.tags', 'tags')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoinAndSelect('comments.author', 'commentsAuthor')
            .orderBy('comments.createdAt', 'DESC')
            .getOne()
    }

    private imgToBuff(img: string): Buffer | null {
        return img ? Buffer.from(img, 'base64') : null
    }

    private async checkTags(tags: string[]): Promise<Tag[]> {
        return await Promise.all(
            tags.map(async (t) => {
                let tag = await this.tagService.findTag(t)

                if (!tag) {
                    tag = await this.tagService.createTag(t)
                }

                return tag
            }),
        )
    }

    async getPostsByDate(order: DBOrder, from: number): Promise<InfoPost[]> {
        const posts = await this.postRepository.find({
            order: {
                createdAt: order,
            },
            skip: from,
            take: 10,
            relations: ['author', 'tags', 'comments'],
        })

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async getPopularPosts(from: number): Promise<InfoPost[]> {
        const posts = await this.postRepository.find({
            order: {
                likes: 'DESC',
            },
            skip: from,
            take: 10,
            relations: ['author', 'tags', 'comments'],
        })

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async getFollowedUserPosts(id: number, from: number): Promise<InfoPost[]> {
        const user = await this.userService.getUserWithFollowedPosts(id)

        if (!user) {
            return null
        }

        return user.followedPosts.slice(from, from + 10).map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async findPost(query: string, from: number): Promise<InfoPost[]> {
        const posts = await this.postRepository.find({
            where: {
                title: ILike(`%${query}%`),
            },
            skip: from,
            take: 10,
            relations: ['author', 'tags', 'comments'],
            order: {
                createdAt: 'DESC',
            },
        })

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async createPost(dto: CreatePostDto): Promise<boolean> {
        const { author, tags, image, ...postContent } = dto
        const user = await this.userService.getUserById(author)
        const postTags = await this.checkTags(tags)

        const post = await this.postRepository.save({
            ...postContent,
            author: user,
            tags: postTags,
            image: this.imgToBuff(image),
        })
        user.followers.forEach(async (follower) => {
            follower.followedPosts.push(post)
            await this.userService.save(follower)
        })

        return post ? true : false
    }

    async updatePost(dto: UpdatePostDto): Promise<boolean> {
        const { author, tags, image, ...postContent } = dto

        const post = await this.postRepository.findOne({
            where: {
                id: postContent.id,
            },
            relations: ['author', 'tags'],
        })

        if (post.author.id !== author) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }

        const postTags = await this.checkTags(tags)

        post.tags = postTags
        post.image = this.imgToBuff(image)
        post.title = postContent.title
        post.content = postContent.content

        const savedPost = await this.postRepository.save(post)

        return savedPost ? true : false
    }

    async getUserPostsByDate(
        id: number,
        order = DBOrder.DESC,
        from: number,
    ): Promise<InfoPost[]> {
        const posts = await this.postRepository.find({
            where: {
                author: {
                    id,
                },
            },
            skip: from,
            take: 10,
            relations: ['tags', 'author', 'comments'],
            order: {
                createdAt: order,
            },
        })

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async getPopularUserPosts(id: number, from: number): Promise<InfoPost[]> {
        const posts = await this.postRepository.find({
            where: {
                author: {
                    id,
                },
            },
            skip: from,
            take: 10,
            relations: ['tags', 'author', 'comments'],
            order: {
                likes: 'DESC',
            },
        })

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async getPostById(id: number): Promise<PostWithContent> {
        const post = await this.findPostByBuilder(id)

        if (!post) {
            return null
        }

        return PostDto.createPostDto(post)
    }

    async getUserSavedPosts(id: number, from: number): Promise<InfoPost[]> {
        const user = await this.userService.getUserWithSavedPosts(id)

        if (!user) {
            return null
        }

        return user.saved
            .slice(from, from + 10)
            .map((post) => PostDto.createPostInfoDto(post))
    }

    async deletePost(id: number) {
        try {
            await this.postRepository.delete(id)
            return true
        } catch (e) {
            return e
        }
    }

    async likePost(postId: number, userId: number): Promise<PostWithContent> {
        const post = await this.findPostByBuilder(postId)

        if (!post) {
            return null
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id !== userId)
            await this.postRepository.save(post)

            return PostDto.createPostDto(post)
        }

        post.likes = [...post.likes, userId]
        const updatedPost = await this.postRepository.save(post)

        return PostDto.createPostDto(updatedPost)
    }

    async savePost(postId: number, userId: number): Promise<UserData> {
        const user = await this.userService.getUserById(userId)
        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            },
        })

        if (!post || !user) {
            return null
        }

        if (user.saved.some((post) => post.id === postId)) {
            user.saved = user.saved.filter((post) => post.id !== postId)

            const author = await this.userService.save(user)

            return UserDto.createUserDto(author)
        }

        user.saved.push(post)

        const author = await this.userService.save(user)

        return UserDto.createUserDto(author)
    }

    async addComment(
        data: AddCommentDto,
        userId: number,
    ): Promise<PostWithContent> {
        const user = await this.userService.getUserById(userId)
        await this.commentsService.addComment(data, user)
        const post = await this.postRepository.findOne({
            where: {
                id: data.postId,
            },
            relations: ['author', 'tags', 'comments', 'comments.author'],
        })

        if (!post || !user) {
            return null
        }

        return PostDto.createPostDto(post)
    }

    async deleteComment(
        commentId: number,
        postId: number,
    ): Promise<PostWithContent> {
        await this.commentsService.deleteComment(commentId)
        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            },
            relations: ['author', 'tags', 'comments', 'comments.author'],
        })

        if (!post) {
            return null
        }

        return PostDto.createPostDto(post)
    }

    async likeComment(
        userId: number,
        commentId: number,
        postId: number,
    ): Promise<PostWithContent> {
        await this.commentsService.likeComment(userId, commentId)

        const post = await this.findPostByBuilder(postId)

        if (!post) {
            return null
        }

        return PostDto.createPostDto(post)
    }
}
