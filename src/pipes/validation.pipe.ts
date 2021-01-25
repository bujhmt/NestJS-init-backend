import {
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
    HttpStatus,
    Injectable,
    HttpException,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException('No data submitted')
        }

        if (!metatype || !this.toValidate(metatype)) {
            return value
        }

        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            throw new HttpException(
                {
                    message: 'Input data validation failed',
                    errors: this.buildError(errors),
                },
                HttpStatus.BAD_REQUEST,
            )
        }
        return value
    }

    private buildError(errors) {
        const result = {}
        errors.forEach((error) => {
            result[error.property] = Object.values(error.constraints)
        })
        return result
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
