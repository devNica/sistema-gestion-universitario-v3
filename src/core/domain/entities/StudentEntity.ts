import { type UUID } from '../models/customs/custom-types.model'

export interface StudentDB {
  id: UUID
  studentNumber: string
  finishedAcademicPlan: boolean
  courseProgramId: UUID
  campusId: UUID
  infoId: UUID
  enrollmentTypeId: UUID
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
