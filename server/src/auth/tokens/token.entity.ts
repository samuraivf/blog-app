import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'

import { User } from '../../user/user.entity'

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    refreshToken: string

    @OneToOne(() => User, (user) => user.token)
    @JoinColumn()
    user: User['id']
}
