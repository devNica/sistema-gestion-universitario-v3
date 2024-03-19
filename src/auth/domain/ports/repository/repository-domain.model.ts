import { type PersonalInfoVO, type UserEntity } from '@auth/domain/entities/AuthEntity'

export type ProfessorRegistrationRepositoryModel =
    Pick<UserEntity, 'username' | 'expiresIn'> &
    Pick<PersonalInfoVO, 'firstname' | 'lastname' | 'personalEmail'> &
    {
      passwordHashed: string
      rolId: string
    }

export type GuestRegistrationRepositoryModel =
    Pick<UserEntity, 'username' | 'expiresIn'> &
    Required<PersonalInfoVO> &
    {
      passwordHashed: string
      rolId: string
    }
