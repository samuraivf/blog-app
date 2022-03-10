import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Post } from './posts.entity'

import { UserModule } from './../user/user.module'
import { TagsModule } from '../tags/tags.module'
import { CommentsModule } from './../comments/comments.module'

import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        UserModule,
        TagsModule,
        CommentsModule,
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
