import { Controller, Get, UseGuards, Param } from '@nestjs/common'

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'

import { UserRequest } from './../posts/dto/user-request'
import { User } from './user.decorator'

import { UserService } from './user.service'

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/find/:username/:from')
    async findUser(
        @Param('username') username: string,
        @Param('from') from: number,
    ) {
        return await this.userService.findUser(username, from)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/follow/:id')
    async followUser(
        @Param('id') id: number,
        @User() user: UserRequest['user'],
    ) {
        return await this.userService.followUser(+id, user.id)
    }
}
