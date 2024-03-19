import { type UUID } from '../models/customs/custom-types.model'

export interface AdmissionDB {
  id: UUID
  initAccu: number
  evalGrade: number
  finalGrade: number
  approved: boolean
  createdAt: Date
  updatedAt: Date
  applicantId: UUID
  evaluatorId: UUID
}
