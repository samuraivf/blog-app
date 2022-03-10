import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { LoginDto } from './dto/login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { TokenService } from './tokens/token.service'
import { Request, Response } from 'express'
import { UserRequest } from '../posts/dto/user-request'
import { AddInfoDto } from './dto/add-info.dto'

@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}

    @Post('/create')
    async create(
        @Res({ passthrough: true }) res: Response,
        @Body() createAccountDto: CreateAccountDto,
    ) {
        const { refreshToken, ...user } = await this.authService.createAccount(
            createAccountDto,
        )

        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return user
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginDto: LoginDto,
    ) {
        const { refreshToken, ...user } = await this.authService.login(loginDto)

        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return user
    }

    @Get('/refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken } = req.cookies
        const { refreshToken: userRefreshToken, ...user } =
            await this.authService.refresh(refreshToken)

        res.cookie('refreshToken', userRefreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return user
    }

    @Get('/logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken } = req.cookies
        const token = await this.authService.logout(refreshToken)

        res.clearCookie('refreshToken')

        return token
    }

    @Get('/profile/:id')
    async getProfile(@Req() req: Request) {
        return await this.authService.getProfile(+req.params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add-info')
    async addInfo(@Req() req: UserRequest, @Body() addInfoDto: AddInfoDto) {
        return await this.authService.addInfo(addInfoDto, +req.user.id)
    }
}
