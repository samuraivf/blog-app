import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { User } from './user/user.entity'
import { Post } from './posts/posts.entity'
import { Tag } from './tags/tags.entity'
import { Token } from './auth/tokens/token.entity'
import { Comment } from './comments/comments.entity'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { TagsModule } from './tags/tags.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            entities: [User, Post, Tag, Token, Comment],
            synchronize: true,
        }),
        AuthModule,
        PostsModule,
        UserModule,
        TagsModule,
    ],
})
export class AppModule {}
