import { type UUID } from '../models/customs/custom-types.model'

export interface RolDB {
  id: string
  rol: string
}

export interface UserHasRoleDB {
  rolId: UUID | string
  userId: UUID | string
}

export interface PersonalInfoDB {
  id: UUID | string
  firstname: string
  lastname: string
  address: string
  dni: string
  phoneNumber: string
  birthdate: string
  nationality: string
  personalEmail: string
  requiresAdmission: boolean
}

export interface UserAccountDB {
  id: string
  username: string
  password: string
  isRoot: boolean
  state: boolean
  expiresIn: number
  createdAt: Date
  updatedAt: Date
  infoId: string | UUID
}
