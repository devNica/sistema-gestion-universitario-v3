import { getDatabaseCredential } from '@core/configs/db-credential.config'
import { type CustomCategoryEntity } from '@core/models/entities/CustomCategoryEntity'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { UserAccountModel } from './UserAccountModel'

const db = getDatabaseCredential()

@Entity({ name: 'custom_category', schema: db.DB_SCHEMA })
export class CustomCategoryModel extends BaseEntity implements CustomCategoryEntity {
  @Unique(['id'])

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true, nullable: false })
    category: string

  @Column({ unique: true, nullable: true, name: 'parent_ref' })
    parentRef!: string

  @Column({ default: true, nullable: false, name: 'is_active' })
    isActive: boolean

  @Column({ name: 'created_at', nullable: false })
    createdAt: string

  @Column({ name: 'updated_at', nullable: true })
    updatedAt!: string

  @ManyToOne(() => UserAccountModel, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @PrimaryColumn({ name: 'user_id' })
    userId: string
}
