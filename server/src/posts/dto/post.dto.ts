import { Post } from './../posts.entity'
import { User } from './../../user/user.entity'
import { Comment } from './../../comments/comments.entity'

export class PostDto {
    static createPostInfoDto(post: Post) {
        const { author, image, content, ...postDto } = post

        return {
            ...postDto,
            author: this.filterAuthorInfo(author),
        }
    }

    static createPostDto(post: Post) {
        const { author, image, comments, ...postDto } = post

        return {
            ...postDto,
            comments: this.filterComments(comments),
            author: this.filterAuthor(author),
            image: this.createImage(image),
        }
    }

    static createImage(image: Buffer | null): string {
        const strImage = image
            ? image
                  .toString('base64')
                  .replace('dataimage/jpegbase64', 'data:image/jpeg;base64, ')
            : null

        return strImage
    }

    static filterComments(comments: Comment[]) {
        return comments.map((comment) => {
            const { author, ...commentData } = comment

            return {
                ...commentData,
                author: this.filterAuthorInfo(author),
            }
        })
    }

    static filterAuthorInfo(author: User) {
        const { id, username, image } = author

        return {
            id,
            username,
            image: this.createImage(image),
        }
    }

    static filterAuthor(author: User) {
        const { id, username, image, description, location, createdAt } = author

        return {
            id,
            username,
            image: this.createImage(image),
            description,
            location,
            createdAt,
        }
    }
}

export type InfoPost = ReturnType<typeof PostDto.createPostInfoDto>
export type PostWithContent = ReturnType<typeof PostDto.createPostDto>
