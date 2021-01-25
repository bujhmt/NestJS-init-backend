import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import { User } from './model/auth.entity'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly usersRepo: Repository<User>,
    ) {}

    public async getAll() {
        return await this.usersRepo.find()
    }

    public async findOne({ email, password }: LoginUserDto): Promise<User> {
        const user = await this.usersRepo.findOne({ email })
        if (!user) {
            return null
        }

        if (await bcrypt.compare(password, user.passwordHash)) {
            return user
        }

        return null
    }

    public async generateJWT(user: User): Promise<string> {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            },
        )
    }
}
