import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common'
import { UserService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthData } from './model/auth.interface'
import { User } from './model/user.entity'
import { ValidationPipe } from '../pipes/validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private usersService: UserService) {}

    @Post('login')
    public async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto): Promise<AuthData> {
        const _user: User = await this.usersService.findOne(loginUserDto)

        if (!_user) throw new HttpException({ user: 'not found' }, HttpStatus.NOT_FOUND)

        const token = await this.usersService.generateJWT(_user)

        return { email: _user.email, token }
    }

    @Post('signUp')
    public async signUp(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    ): Promise<AuthData> {
        const _user: User = await this.usersService.create(createUserDto)
        Logger.log(_user)
        const token = await this.usersService.generateJWT(_user)
        return { email: _user.email, token }
    }
}
