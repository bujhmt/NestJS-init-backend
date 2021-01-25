import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(100)
    readonly password: string
}
