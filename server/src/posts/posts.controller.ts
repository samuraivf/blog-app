import {
    Body,
    Controller,
    Delete,
    Get,
    Put,
    Post,
    Req,
    UseGuards,
    Param,
} from '@nestjs/common'
import { Request } from 'express'

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'

import { CreatePostDto } from './dto/create-post.dto'
import { UserRequest } from './dto/user-request'
import { AddCommentDto } from './dto/add-comment.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InfoPost, PostWithContent } from './dto/post.dto'
import { Params } from './dto/params.dto'

import { UserData } from 'src/auth/dto/user'
import { DBOrder } from 'src/enums/db-order'

import { PostsService } from './posts.service'

@Controller('/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/latest/:from')
    async getLatestPosts(@Param() params: Params): Promise<InfoPost[]> {
        return await this.postsService.getPostsByDate(DBOrder.DESC, params.from)
    }

    @Get('/popular/:from')
    async getPopularPosts(@Param() params: Params): Promise<InfoPost[]> {
        return await this.postsService.getPopularPosts(params.from)
    }

    @Get('/oldest/:from')
    async getOldestPosts(@Param() params: Params): Promise<InfoPost[]> {
        return await this.postsService.getPostsByDate(DBOrder.ASC, params.from)
    }

    @Get('/:id')
    async getPost(@Req() req: Request): Promise<PostWithContent> {
        return await this.postsService.getPostById(+req.params.id)
    }

    @Get('/search/:q/:from')
    async findPost(@Req() req: Request): Promise<InfoPost[]> {
        return await this.postsService.findPost(req.params.q, +req.params.from)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/followed-posts/:from')
    async getFollowedUserPosts(@Req() req: UserRequest) {
        return await this.postsService.getFollowedUserPosts(
            +req.user.id,
            +req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/save/:id')
    async savePost(@Req() req: UserRequest): Promise<UserData> {
        return await this.postsService.savePost(+req.params.id, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id/like')
    async likePost(@Req() req: UserRequest): Promise<PostWithContent> {
        return await this.postsService.likePost(+req.params.id, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-posts/latest/:from')
    async getLatestUserPosts(@Req() req: UserRequest): Promise<InfoPost[]> {
        return await this.postsService.getUserPostsByDate(
            req.user.id,
            DBOrder.DESC,
            +req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-posts/popular/:from')
    async getPopularUserPosts(@Req() req: UserRequest): Promise<InfoPost[]> {
        return await this.postsService.getPopularUserPosts(
            req.user.id,
            +req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-posts/oldest/:from')
    async getOldestUserPosts(@Req() req: UserRequest): Promise<InfoPost[]> {
        return await this.postsService.getUserPostsByDate(
            req.user.id,
            DBOrder.ASC,
            +req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-posts/saved/:from')
    async getUserSavedPosts(@Req() req: UserRequest): Promise<InfoPost[]> {
        return await this.postsService.getUserSavedPosts(
            req.user.id,
            +req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createPost(@Body() createPostDto: CreatePostDto): Promise<boolean> {
        return await this.postsService.createPost(createPostDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updatePost(@Body() updatePostDto: UpdatePostDto): Promise<boolean> {
        return await this.postsService.updatePost(updatePostDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deletePost(@Req() req: Request): Promise<boolean> {
        return await this.postsService.deletePost(+req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/comment')
    async addComment(
        @Body() addCommentDto: AddCommentDto,
        @Req() req: UserRequest,
    ): Promise<PostWithContent> {
        return await this.postsService.addComment(addCommentDto, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:postid/comment/:commentid')
    async deleteComment(@Req() req: UserRequest): Promise<PostWithContent> {
        return await this.postsService.deleteComment(
            +req.params.commentid,
            +req.params.postid,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:postid/comment/like/:commentid')
    async likeComment(@Req() req: UserRequest): Promise<PostWithContent> {
        return await this.postsService.likeComment(
            +req.user.id,
            +req.params.commentid,
            +req.params.postid,
        )
    }
}
