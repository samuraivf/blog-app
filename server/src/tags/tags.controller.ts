import { Controller, Get, Req } from '@nestjs/common'
import { TagsService } from './tags.service'
import { Request } from 'express'
import { DBOrder } from 'src/enums/db-order'

@Controller('/tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    async getTags() {
        const tags = await this.tagsService.getTags()

        return tags
    }

    @Get('/:tag/latest/:from')
    async getLatestPostsByTag(@Req() req: Request) {
        const posts = await this.tagsService.getPostsByTag(
            req.params.tag,
            DBOrder.DESC,
            +req.params.from,
        )

        return posts
    }

    @Get('/:tag/oldest/:from')
    async getOldestPostsByTag(@Req() req: Request) {
        const posts = await this.tagsService.getPostsByTag(
            req.params.tag,
            DBOrder.ASC,
            +req.params.from,
        )

        return posts
    }

    @Get('/:tag/popular/:from')
    async getPopularPostsByTag(@Req() req: Request) {
        const posts = await this.tagsService.getPopularPostsByTag(
            req.params.tag,
            +req.params.from,
        )

        return posts
    }
}
