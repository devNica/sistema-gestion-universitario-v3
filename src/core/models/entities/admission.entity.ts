import { type UUID } from '../generic/custom-types.model'

export interface AdmissionEntity {
  id: UUID
  initAccu: number
  evalGrade: number
  finalGrade: number
  approved: boolean
  createdAt: Date
  updatedAt: Date
  applicantId: string
}
