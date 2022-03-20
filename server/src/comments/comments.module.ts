import { Module } from '@nestjs/common'

import { Comment } from './comments.entity'

import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentsService } from './comments.service'

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}
