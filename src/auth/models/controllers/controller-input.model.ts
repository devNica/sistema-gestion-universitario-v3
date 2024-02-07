// Input Controller
// Output Controller

import { type ProfileInfoEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'

export type UserRegistrationIC = Pick<UserAccountEntity, 'username' | 'password' | 'profileId'>

export type UserProfileRegistrationIC = Omit<ProfileInfoEntity, 'id'>

export type UniversitaryApplicantRegistrationIC = Omit<ProfileInfoEntity, 'id'>
