import { type UUID } from '../generic/custom-types.model'

export interface RolEntity {
  id: UUID
  rol: string
  users?: Pick<UserAccountEntity, 'id' | 'email' | 'state'>
}

export interface UserHasRoleEntity {
  rolId: UUID
  userId: UUID
}

export interface UserAccountEntity {
  id: UUID
  email: string
  password: string
  isRoot: boolean
  state: boolean
  createdAt: Date
  updatedAt: Date
  profileId: string
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
