import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './model/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly repo: Repository<Auth>) { }

  public async getAll() {
      return await this.repo.find();
  }
}
