import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UserService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './model/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [UserService],
})
export class AuthModule {}
