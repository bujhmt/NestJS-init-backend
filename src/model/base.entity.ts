import {
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm'

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @Column({ type: 'boolean', default: false })
    isArchived: boolean

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createDateTime: Date

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    lastChangedDateTime: Date
}
