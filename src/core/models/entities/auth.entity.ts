import { type UUID } from '../generic/custom-types.model'

export interface RolEntity {
  id: UUID
  rol: string
  users?: Pick<UserAccountEntity, 'id' | 'username' | 'state'>
}

export interface UserHasRoleEntity {
  rolId: UUID
  userId: UUID
}

export interface UserAccountEntity {
  id: UUID
  username: string
  password: string
  isRoot: boolean
  state: boolean
  expiresIn: number
  createdAt: Date
  updatedAt: Date
  profileId: UUID
  roles?: Pick<RolEntity, 'id' | 'rol'>
}

export interface ProfileInfoEntity {
  id: UUID
  firstname: string
  lastname: string
  birthdate: string
  dni: string
  phoneNumber: string
  nationality: string
  address: string
  personalEmail: string
}

export interface ProfileHasPictureEntity {
  profileId: UUID
  fileId: UUID
}

export interface FileEntity {
  filename: UUID
  filetype: string
  filesize: number
  binary: Buffer
}
