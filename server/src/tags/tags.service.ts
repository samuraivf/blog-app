import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Tag } from './tags.entity'
import { Post } from 'src/posts/posts.entity'

import { DBOrder } from 'src/enums/db-order'

import { PostDto, InfoPost } from '../posts/dto/post.dto'

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepositiry: Repository<Tag>,
    ) {}

    private filterTag(tag: Tag) {
        const { posts, ...tagData } = tag

        return tagData
    }

    private merge(arr1: Tag[], arr2: Tag[]): Tag[] {
        const results = []
        let i = 0
        let j = 0

        while (i < arr1.length && j < arr2.length) {
            if (arr2[j].posts.length > arr1[i].posts.length) {
                results.push(arr2[j])
                j++
            } else {
                results.push(arr1[i])
                i++
            }
        }

        while (i < arr1.length) {
            results.push(arr1[i])
            i++
        }
        while (j < arr2.length) {
            results.push(arr2[j])
            j++
        }

        return results
    }

    private mergeSort(arr: Tag[]): Tag[] {
        if (arr.length <= 1) return arr
        const mid = Math.floor(arr.length / 2)
        const left = this.mergeSort(arr.slice(0, mid))
        const right = this.mergeSort(arr.slice(mid))
        return this.merge(left, right)
    }

    async findTag(name: string): Promise<Tag> {
        return await this.tagRepositiry.findOne({ where: { name } })
    }

    async createTag(name: string): Promise<Tag> {
        return await this.tagRepositiry.save({ name })
    }

    async getTags() {
        const tags = await this.tagRepositiry.find({
            relations: ['posts'],
        })

        const sortedTags = this.mergeSort(tags).slice(0, 100)

        return sortedTags.map((tag) => this.filterTag(tag))
    }

    private async getPosts(
        tagName: string,
        order: DBOrder,
        orderProperty: string,
        from: number,
    ): Promise<Post[]> {
        try {
            const tag = await this.tagRepositiry
                .createQueryBuilder('tag')
                .where('tag.name = :name', { name: tagName })
                .leftJoinAndSelect('tag.posts', 'posts')
                .leftJoinAndSelect('posts.tags', 'tags')
                .leftJoinAndSelect('posts.author', 'author')
                .leftJoinAndSelect('posts.comments', 'comment')
                .orderBy(`posts.${orderProperty}`, order)
                .getOne()

            if (tag && tag.posts) {
                return tag.posts.slice(from, from + 10)
            }

            return []
        } catch (error) {
            throw error
        }
    }

    async getPostsByTag(
        tag: string,
        order: DBOrder,
        from: number,
    ): Promise<InfoPost[]> {
        const posts = await this.getPosts(tag, order, 'createdAt', from)

        if (!posts) {
            return null
        }

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }

    async getPopularPostsByTag(tag: string, from: number): Promise<InfoPost[]> {
        const posts = await this.getPosts(tag, DBOrder.DESC, 'likes', from)

        if (!posts) {
            return null
        }

        return posts.map((post) => {
            return PostDto.createPostInfoDto(post)
        })
    }
}
