import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcryptjs'
import { User } from './model/user.entity'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import jwt from 'jsonwebtoken'
import { CreateUserDto } from './dto/create-user.dto'
import { validate } from 'class-validator'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async create(createUserDto: CreateUserDto): Promise<User> {
        //extra validation
        const errors = await validate(createUserDto)
        if (errors.length > 0)
            throw new HttpException(
                { message: 'Invalid input data', errors },
                HttpStatus.BAD_REQUEST,
            )

        const { email, password } = createUserDto

        //check email uniqueness
        if (await this.userRepo.find({ email }))
            throw new HttpException(
                { message: 'This email already exists ' },
                HttpStatus.BAD_REQUEST,
            )

        //create & save model
        const newUser: User = new User()
        newUser.email = email
        newUser.passwordHash = await bcrypt.hash(password, 12)

        return await this.userRepo.save(newUser)
    }

    public async findOne({ email, password }: LoginUserDto): Promise<User> {
        const user = await this.userRepo.findOne({ email })
        if (!user) {
            return null
        }

        if (await bcrypt.compare(password, user.passwordHash)) {
            return user
        }

        return null
    }

    public async generateJWT(user: User): Promise<string> {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
    }
}
