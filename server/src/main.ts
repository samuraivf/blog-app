import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json } from 'express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL,
        },
    })
    app.use(cookieParser())
    app.use(json({ limit: '50mb' }))

    await app.listen(process.env.PORT || 5000)
}

bootstrap()
