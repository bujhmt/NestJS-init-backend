import { Entity, Column } from 'typeorm'
import { BaseEntity } from '../../model/base.entity'

@Entity({ name: 'User' })
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 300 })
    email: string

    @Column({ type: 'varchar', length: 300 })
    passwordHash: string
}
