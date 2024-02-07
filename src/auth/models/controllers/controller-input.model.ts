// Input Controller
// Output Controller

import { type ProfileInfoEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'

export type UserRegistrationIC = Pick<UserAccountEntity, 'email' | 'password' | 'profileId'>

export type UserProfileRegistrationIC = Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'address' | 'birthdate' | 'dni' | 'nationality' | 'phoneNumber'>
