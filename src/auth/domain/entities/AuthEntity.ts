import { type AuthenticationRolModel } from '@core/domain/models/api/auth.model'
import { type UUID } from '@core/domain/models/customs/custom-types.model'

export class RolEntity {
  constructor (
    public rolId: string,
    public rol: AuthenticationRolModel,
    public users?: string[]
  ) {}
}

export class PersonalInfoEntity {
  constructor (
    public firstname: string,
    public lastname: string,
    public address: string,
    public dni: string,
    public phoneNumber: string,
    public birthdate: string,
    public nationality: string,
    public personalEmail: string,
    public requiresAdmission: boolean
  ) {}
}

export class UserEntity {
  constructor (
    public userId: string | UUID,
    public username: string,
    public passwordHashed: string,
    public isRoot: boolean,
    public state: boolean,
    public expiresIn: number,
    public infoId?: string | UUID,
    public rolId?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public personalInfo?: PersonalInfoEntity,
    public rolInfo?: Partial<RolEntity>
  ) {}
}
