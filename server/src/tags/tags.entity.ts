import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Post } from 'src/posts/posts.entity'

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Post, (post) => post.tags)
    posts: Post[]
}
