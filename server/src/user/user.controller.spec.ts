import { Test, TestingModule } from '@nestjs/testing'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from './user.entity'

describe('test UserController', () => {
    let controller: UserController

    const mockUsers: User[] = [
        {
            id: 1,
            username: 'username',
            email: 'email@mail.com',
            password: '123456789',
            description: 'ADFdsf',
            location: 'test',
            image: null,
            posts: [],
            comments: [],
            token: { id: 1, refreshToken: '', user: null },
            saved: [],
            followers: [],
            followed: [],
            followedPosts: [],
            createdAt: null,
        },
    ]

    const mockUserService = {
        findUser: jest.fn().mockResolvedValue(mockUsers),
        followUser: jest.fn().mockResolvedValue(true),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile()

        controller = module.get<UserController>(UserController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should test findUser', async () => {
        expect(await controller.findUser('username', 0)).toEqual(mockUsers)
    })

    it('should test followUser', async () => {
        const user = {
            id: 1,
            username: '123',
            email: '123@gmail.com',
        }

        expect(await controller.followUser(1, user)).toBe(true)
    })
})
