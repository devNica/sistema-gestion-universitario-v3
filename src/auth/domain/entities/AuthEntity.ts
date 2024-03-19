import { type AuthenticationRolModel } from '@core/domain/models/api/auth.model'
import { type UUID } from '@core/domain/models/customs/custom-types.model'

export class RolEntity {
  constructor (
    public rolId: string,
    public rol: AuthenticationRolModel,
    public users?: string[]
  ) {}
}

export interface PersonalInfoVO {
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

export class UserEntity {
  constructor (
    public userId: string | UUID,
    public username: string,
    public passwordHashed: string,
    public isRoot: boolean,
    public state: boolean,
    public expiresIn: number,
    public personalInfo: PersonalInfoVO,
    public infoId?: string | UUID,
    public rolId?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public rolInfo?: Partial<RolEntity>
  ) {}
}
