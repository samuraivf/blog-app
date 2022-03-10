import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { AddCommentDto } from './../posts/dto/add-comment.dto'
import { User } from './../user/user.entity'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async addComment(data: AddCommentDto, user: User): Promise<Comment> {
        return await this.commentRepository.save({
            content: data.content,
            post: data.postId,
            author: user,
        })
    }

    async deleteComment(id: number) {
        return await this.commentRepository.delete(id)
    }

    async likeComment(userId: number, commentId: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
            },
        })

        if (!comment) {
            return null
        }

        if (comment.likes.includes(userId)) {
            comment.likes = comment.likes.filter((id) => id !== userId)

            return await this.commentRepository.save(comment)
        }

        comment.likes.push(userId)
        return await this.commentRepository.save(comment)
    }
}
