import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

import { Token } from './token.entity'

import { UserDto } from './../dto/user'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private readonly jwtService: JwtService,
    ) {}

    async generateTokens(user: UserDto) {
        const payload = {
            email: user.email,
            id: user.id,
            username: user.username,
        }

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_KEY,
                expiresIn: '1d',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_KEY,
                expiresIn: '60d',
            }),
        }
    }

    async validateAccessToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_KEY,
            })
        } catch (e) {
            return null
        }
    }

    async validateRefreshToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_KEY,
            })
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: number, refreshToken: string): Promise<Token> {
        const tokenData = await this.tokenRepository.findOne({
            where: { user: userId },
        })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return this.tokenRepository.save(tokenData)
        }

        const token = await this.tokenRepository.save({
            user: userId,
            refreshToken,
        })

        return token
    }

    async removeToken(refreshToken: string) {
        return await this.tokenRepository.delete({ refreshToken })
    }

    async findToken(refreshToken: string): Promise<Token> {
        return await this.tokenRepository.findOne({ where: { refreshToken } })
    }
}
