import { type UUID } from '../generic/custom-types.model'
import { type ProfileInfoEntity } from './auth.entity'

export interface StudentEntity {
  id: UUID
  studentNumber: string
  finishedAcademicPlan: boolean
  courseProgramId: UUID
  campusId: UUID
  profileId: UUID
  enrollmentTypeId: UUID
  profile?: Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'dni' | 'requiresAdmission'>
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
