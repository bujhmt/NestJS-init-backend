import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../model/base.entity';

@Entity({ name: 'User' })
export class Auth extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;
}