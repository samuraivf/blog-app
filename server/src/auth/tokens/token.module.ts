import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { Token } from './token.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [TypeOrmModule.forFeature([Token]), JwtModule.register({})],
    controllers: [],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
