import { type PersonalInfoEntity, type UserEntity } from '@auth/domain/entities/AuthEntity'

export type ProfessorRegistrationRepositoryModel =
    Pick<UserEntity, 'username' | 'expiresIn'> &
    Pick<PersonalInfoEntity, 'firstname' | 'lastname' | 'personalEmail'> &
    {
      passwordHashed: string
      rolId: string
    }

export type GuestRegistrationRepositoryModel =
    Pick<UserEntity, 'username' | 'expiresIn'> &
    Omit<PersonalInfoEntity, 'id'> &
    {
      passwordHashed: string
      rolId: string
    }
