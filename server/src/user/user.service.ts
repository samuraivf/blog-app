import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'

import { User } from './user.entity'

import { CreateAccountDto } from './../auth/dto/create-account.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(dto: CreateAccountDto): Promise<User> {
        return await this.userRepository.save(dto)
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } })
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: [
                'saved',
                'followed',
                'followers',
                'followers.followedPosts',
            ],
        })
    }

    async getProfile(id: number) {
        const profile = await this.userRepository.findOne({
            where: { id },
            relations: [
                'followers',
                'posts',
                'posts.author',
                'posts.tags',
                'posts.comments',
                'comments',
            ],
        })

        if (!profile) {
            return null
        }

        const { password, email, followers, ...profileData } = profile

        return {
            ...profileData,
            followers: followers.map((follower) => follower.id),
        }
    }

    async getUserWithSavedPosts(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: [
                'saved',
                'saved.author',
                'saved.comments',
                'saved.tags',
            ],
        })
    }

    async getUserByIdWithPosts(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['posts', 'posts.tags'],
        })
    }

    async getUserWithFollowedPosts(id: number): Promise<User> {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .leftJoinAndSelect('user.followedPosts', 'followedPosts')
            .leftJoinAndSelect('followedPosts.author', 'author')
            .leftJoinAndSelect('followedPosts.comments', 'comments')
            .leftJoinAndSelect('followedPosts.tags', 'tags')
            .orderBy('followedPosts.createdAt', 'DESC')
            .getOne()
    }

    async followUser(authorId: number, followerId: number): Promise<boolean> {
        const author = await this.userRepository.findOne({
            where: {
                id: authorId,
            },
            relations: ['followers', 'posts'],
        })
        const user = await this.userRepository.findOne({
            where: {
                id: followerId,
            },
            relations: ['followed', 'followedPosts'],
        })

        if (!author || !user) {
            return null
        }

        if (author.followers.some((follower) => follower.id === followerId)) {
            author.followers = author.followers.filter(
                (follower) => follower.id !== followerId,
            )
            user.followed = user.followed.filter(
                (author) => author.id !== authorId,
            )
            author.posts.forEach((post) => {
                user.followedPosts = user.followedPosts.filter(
                    (followedPost) => followedPost.id !== post.id,
                )
            })

            return (await this.save(author)) && (await this.save(user))
                ? true
                : false
        }

        author.followers.push(user)
        user.followed.push(author)
        author.posts.forEach((post) => user.followedPosts.push(post))

        return (await this.save(author)) && (await this.save(user))
            ? true
            : false
    }

    async findUser(name: string, from: number) {
        const users = await this.userRepository.find({
            where: {
                username: ILike(`%${name}%`),
            },
            skip: from,
            take: 10,
        })

        return users.map((user) => {
            const { username, image, id } = user

            return {
                username,
                image: image
                    ? image
                          .toString('base64')
                          .replace(
                              'dataimage/jpegbase64',
                              'data:image/jpeg;base64, ',
                          )
                    : null,
                id,
            }
        })
    }

    async save(entity: User): Promise<User> {
        return await this.userRepository.save(entity)
    }
}
