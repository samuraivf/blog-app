import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm'
import { Post } from 'src/posts/posts.entity'
import { User } from './../user/user.entity'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @Column('int', { array: true, default: [] })
    likes: number[]

    @ManyToOne(() => User, (user) => user.comments)
    author: User

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post['id']
}
