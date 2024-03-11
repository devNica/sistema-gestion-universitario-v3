import { type ProfileInfoEntity, type RolEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'

export type UserAccountOR = Omit<UserAccountEntity, 'createdAt' | 'updatedAt' | 'roles'>

export type RolOR = Pick<RolEntity, 'id' | 'rol'>

export type UserProfileOR = Omit<UserAccountEntity, 'createdAt' | 'updatedAt' | 'profileId' | 'roles'> &
Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'phoneNumber'> & {
  rol: string
}
