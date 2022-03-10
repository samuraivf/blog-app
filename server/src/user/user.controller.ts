import { Controller, Get, Req, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'

import { UserRequest } from './../posts/dto/user-request'

import { UserService } from 'src/user/user.service'

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/find/:username/:from')
    async findUser(@Req() req) {
        return await this.userService.findUser(
            req.params.username,
            req.params.from,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/follow/:id')
    async followUser(@Req() req: UserRequest) {
        return await this.userService.followUser(+req.params.id, req.user.id)
    }
}
