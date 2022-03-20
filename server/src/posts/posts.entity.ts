import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from './../user/user.entity'
import { Tag } from './../tags/tags.entity'
import { Comment } from './../comments/comments.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'bytea', nullable: true })
    image: Buffer

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.posts)
    author: User

    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    tags: Tag[]

    @Column('int', { array: true, default: [] })
    likes: number[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
}
