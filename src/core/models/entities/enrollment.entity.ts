import { type UUID } from '../generic/custom-types.model'

export interface EnrollmentTypeEntity {
  id: UUID
  enrollment: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
