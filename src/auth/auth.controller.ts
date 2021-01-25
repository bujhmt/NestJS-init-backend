import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { UserData } from './model/auth.interface'
import { User } from './model/auth.entity'
import { ValidationPipe } from '../pipes/validation.pipe'

@Controller('auth')
export class AuthController {
    constructor(private usersService: AuthService) {}

    @Get()
    public async getAll() {
        return await this.usersService.getAll()
    }

    @Post('login')
    public async login(
        @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
    ): Promise<UserData> {
        const _user: User = await this.usersService.findOne(loginUserDto)

        if (!_user)
            throw new HttpException({ user: 'not found' }, HttpStatus.NOT_FOUND)

        const token = await this.usersService.generateJWT(_user)

        return { email: _user.email, token }
    }
}
