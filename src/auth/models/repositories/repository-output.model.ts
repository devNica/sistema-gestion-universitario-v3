import { type ProfileInfoEntity } from '@core/models/entities/auth.entity'

export type ProfilePersonOR = Pick<ProfileInfoEntity, 'id' | 'firstname' | 'lastname' | 'address' | 'birthdate' | 'dni' | 'nationality' | 'phoneNumber'>
