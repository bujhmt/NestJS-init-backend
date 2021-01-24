import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private serv: AuthService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

}
