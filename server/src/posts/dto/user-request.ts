import { Request } from 'express'

export interface UserRequest extends Request {
    user: {
        id: number
        username: string
        email: string
    }
}
