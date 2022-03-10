import { Post } from './../../posts/posts.entity'
import { User } from 'src/user/user.entity'

export class UserDto {
    readonly id: number
    readonly username: string
    readonly email: string
    readonly saved: Post[]

    constructor(user: UserDto) {
        this.id = user.id
        this.username = user.username
        this.email = user.email
        this.saved = user.saved
    }

    static createUserDto(user: User) {
        return {
            user: {
                id: user.id,
                username: user.username,
                saved: user.saved.map((post) => post.id),
                followed: user.followed.map((author) => author.id),
            },
        }
    }
}

export type UserData = ReturnType<typeof UserDto.createUserDto>
