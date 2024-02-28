import { type UUID } from '../generic/custom-types.model'

export interface OrgUnitEntity {
  id: UUID
  unitName: string
  reference: string
  createdAt: Date
  updatedAt: Date
}

export interface CourseEntity {
  id: UUID
  referenceName: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  unitId: UUID
}

export interface CampusEntity {
  id: UUID
  referenceName: string
  address: string
  email: string
  phones: string
}

export interface CampusHasCourseEntity {
  campusId: UUID
  courseId: UUID
}

export interface CourseProgramEntity {
  id: UUID
  plan: string
  programRef: string
  isCurrentPlan: boolean
  availableForNewEntry: boolean
  availableForReEntry: boolean
  replaceBy: UUID
  isActive: boolean
  courseId: UUID
  createdAt: Date
  updatedAt: Date
}
