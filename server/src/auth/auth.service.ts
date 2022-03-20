import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { LoginDto } from './dto/login.dto'
import { CreateAccountDto } from './dto/create-account.dto'
import { UserDto } from './dto/user'
import { AddInfoDto } from './dto/add-info.dto'
import { PostDto } from './../posts/dto/post.dto'

import { TokenService } from './tokens/token.service'
import { UserService } from './../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto.email, userDto.password)
        const tokens = await this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }

    async createAccount(userDto: CreateAccountDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException(
                'User have already exist',
                HttpStatus.BAD_REQUEST,
            )
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const { password, ...user } = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        })

        const tokens = await this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }

    async getProfile(id: number) {
        const profile = await this.userService.getProfile(id)

        if (!profile) {
            return null
        }

        const { image, posts, ...profileData } = profile

        return {
            profile: {
                image: PostDto.createImage(image),
                ...profileData,
                posts: posts.map((post) => PostDto.createPostInfoDto(post)),
                comments: profile.comments.length,
            },
        }
    }

    async addInfo(dto: AddInfoDto, userId: number) {
        const user = await this.userService.getUserById(userId)

        if (!user) {
            return null
        }

        user.description = dto.description
        user.location = dto.location
        user.username = dto.username

        if (!user.image) {
            user.image = dto.image ? Buffer.from(dto.image, 'base64') : null
        }

        if (user.image && dto.image) {
            user.image = Buffer.from(dto.image, 'base64')
        }

        const { password, email, ...editedUser } = await this.userService.save(
            user,
        )

        return editedUser
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email)

        if (!user) {
            return null
        }

        const passwordEquals = await bcrypt.compare(password, user.password)

        if (user && passwordEquals) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async logout(refreshToken: string) {
        return await this.tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException()
        }

        const userData = await this.tokenService.validateRefreshToken(
            refreshToken,
        )
        const token = await this.tokenService.findToken(refreshToken)

        if (!userData || !token) {
            throw new UnauthorizedException()
        }

        const user = await this.userService.getUserById(userData.id)
        const userDto = new UserDto(user)
        const tokens = await this.tokenService.generateTokens(userDto)

        await this.tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...UserDto.createUserDto(user),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }
}
