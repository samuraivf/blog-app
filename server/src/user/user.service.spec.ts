import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { User } from './user.entity'
import { Token } from '../auth/tokens/token.entity'

import { UserService } from './user.service'

describe('UsersService', () => {
    let service: UserService

    const user: User = {
        id: 1,
        username: 'username',
        password: '123456788',
        email: 'test@mail.com',
        description: '',
        location: '',
        createdAt: undefined,
        image: null,
        posts: [],
        comments: [],
        token: new Token(),
        saved: [],
        followers: [],
        followed: [],
        followedPosts: [],
    }

    const dbUser = (newid: number, salt: string) => {
        const { id, username, password, email, ...userData } = user

        return {
            username: username + salt,
            password: password + salt,
            email: email + salt,
            id: newid,
            ...userData,
        }
    }

    const users = [dbUser(1, ''), dbUser(2, '2')]

    type Options = {
        where: {
            username?: string
            id?: number
            email?: string
        }
    }

    const mockUserRepository = {
        save: jest
            .fn()
            .mockImplementation((user) =>
                Promise.resolve({ id: Date.now(), ...user }),
            ),
        findOne: jest.fn().mockImplementation((options: Options) => {
            const key = Object.keys(options.where)[0]
            return users.find((user) => user[key] === options.where[key])
        }),
        find: jest.fn().mockImplementation((options: Options) => {
            const key = Object.keys(options.where)[0]
            const ilike = options.where[key]._value as string
            const username = ilike.slice(1, ilike.length - 1)

            return users.filter((user) => user[key] === username)
        }),
        createQueryBuilder: jest.fn(() => ({
            offset: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            where: jest
                .fn()
                .mockImplementation((str: string, id: number) =>
                    users.find((user) => user.id === id),
                )
                .mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockReturnValueOnce(user),
        })),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should test createUser', async () => {
        expect(await service.createUser(user)).toEqual({
            id: expect.any(Number),
            ...user,
        })
    })

    it('should test getUserByEmail', async () => {
        expect(await service.getUserByEmail(user.email)).toEqual(users[0])
    })

    it('should test getUserById', async () => {
        expect(await service.getUserById(1)).toEqual(users[0])
    })

    it('should test getProfile', async () => {
        const { password, email, followers, ...profileData } = user

        const profile = {
            ...profileData,
            followers: followers.map((follower) => follower.id),
        }

        expect(await service.getProfile(1)).toEqual(profile)
    })

    it('should test getUserWithSavedPosts', async () => {
        expect(await service.getUserWithSavedPosts(1)).toEqual(users[0])
    })

    it('should test getUserByIdWithPosts', async () => {
        expect(await service.getUserByIdWithPosts(1)).toEqual(users[0])
    })

    it('should test getUserWithFollowedPosts', async () => {
        expect(await service.getUserWithFollowedPosts(1)).toEqual(users[0])
    })

    it('should test findUser', async () => {
        const { username, image, id } = users[0]

        const foundedUsers = {
            username,
            image: image
                ? image
                      .toString('base64')
                      .replace(
                          'dataimage/jpegbase64',
                          'data:image/jpeg;base64, ',
                      )
                : null,
            id,
        }

        expect(await service.findUser('username', 0)).toEqual([foundedUsers])
    })

    it('should test followUser when ids invalid', async () => {
        expect(await service.followUser(-1, 0)).toBeNull()
    })

    it('should test followUser when not followed', async () => {
        expect(await service.followUser(1, 2)).toBeTruthy()
        expect(
            users[0].followers.some((follower) => follower.id === users[1].id),
        ).toBeTruthy
        expect(
            users[1].followed.some((author) => author.id === users[0].id),
        ).toBeTruthy()
    })

    it('should test followUser when followed', async () => {
        expect(await service.followUser(1, 2)).toBeTruthy()
        expect(
            users[0].followers.some((follower) => follower.id === users[1].id),
        ).toBeFalsy()
        expect(
            users[1].followed.some((author) => author.id !== users[0].id),
        ).toBeFalsy()
    })

    it('should test save', async () => {
        expect(await service.save(user)).toEqual(user)
    })
})
