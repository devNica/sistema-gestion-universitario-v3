import { getDatabaseCredential } from '@core/configs/db-credential.config'
import { type UserAccountEntity } from '@core/models/entities/UserAccountEntity'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

const db = getDatabaseCredential()

@Entity({ name: 'user_account', schema: db.DB_SCHEMA })
export class UserAccountModel extends BaseEntity implements UserAccountEntity {
  @Unique(['id'])

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true, nullable: false })
    email: string

  @Column({ unique: true, nullable: true })
    username!: string

  @Column({ length: 255, nullable: false })
    password: string

  @Column({ unique: true, nullable: true, name: 'phone_number', length: 20 })
    phoneNumber!: string

  @Column({ default: false, nullable: false, name: 'two_factor_auth' })
    twoFactorAuth: boolean

  @Column({ default: true, nullable: false })
    status: boolean

  @Column({ default: false, nullable: false })
    isRoot: boolean

  @Column({ name: 'created_at', nullable: false })
    createdAt: string

  @Column({ name: 'updated_at', nullable: true })
    updatedAt!: string
}
