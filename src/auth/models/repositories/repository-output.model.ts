import { type RolEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'

export type UserAccountOR = Omit<UserAccountEntity, 'createdAt' | 'updatedAt' | 'profileId' | 'roles'>

export type RolOR = Pick<RolEntity, 'id' | 'rol'>
