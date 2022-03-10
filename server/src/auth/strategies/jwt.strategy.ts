import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_KEY,
        })
    }

    async validate(payload: any) {
        return {
            id: payload.id,
            email: payload.email,
            username: payload.username,
        }
    }
}
