import { getDatabaseCredential } from '@core/configs/db-credential.config'
import { type CommonCategoryEntity } from '@core/models/entities/CommonCategoryEntity'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

const db = getDatabaseCredential()

@Entity({ name: 'common_category', schema: db.DB_SCHEMA })
export class CommonCategoryModel extends BaseEntity implements CommonCategoryEntity {
  @Unique(['id'])

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true, nullable: false })
    category: string

  @Column({ unique: false, nullable: true, name: 'parent_ref' })
    parentRef!: string

  @Column({ unique: false, nullable: false, name: 'has_childrens' })
    hasChildrens: boolean

  @Column({ nullable: false, type: 'bit' })
    flow: number

  @Column({ default: true, nullable: false, name: 'is_active' })
    isActive: boolean

  @Column({ name: 'created_at', nullable: false })
    createdAt: string

  @Column({ name: 'updated_at', nullable: true })
    updatedAt!: string
}
