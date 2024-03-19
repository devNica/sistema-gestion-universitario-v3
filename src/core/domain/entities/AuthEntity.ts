export interface RolDB {
  id: string
  rol: string
}

export interface UserHasRoleDB {
  rolId: string
  userId: string
}

export interface PersonalInfoDB {
  id: string
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
  personalInfo: string
}
