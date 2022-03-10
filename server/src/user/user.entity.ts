import { Post } from 'src/posts/posts.entity'
import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
} from 'typeorm'
import { Token } from '../auth/tokens/token.entity'
import { Comment } from './../comments/comments.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20, nullable: false })
    username: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ type: 'varchar', length: 200, nullable: true })
    description: string

    @Column({ type: 'varchar', length: 30, nullable: true })
    location: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ type: 'bytea', nullable: true })
    image: Buffer

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[]

    @OneToOne(() => Token, (token) => token.user)
    token: Token

    @ManyToMany(() => Post)
    @JoinTable()
    saved: Post[]

    @ManyToMany(() => User, (user) => user.followed)
    followers: User[]

    @ManyToMany(() => User, (user) => user.followers)
    @JoinTable()
    followed: User[]

    @ManyToMany(() => Post)
    @JoinTable()
    followedPosts: Post[]
}
