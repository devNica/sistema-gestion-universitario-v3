import { type UUID } from '../models/customs/custom-types.model'

export interface OrganizationalUnitDB {
  id: UUID | string
  unitName: string
  reference: string
  createdAt: Date
  updatedAt: Date
}

export interface CourseDB {
  id: UUID | string
  courseName: string
  reference: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  unitId: UUID
}

export interface CampusDB {
  id: UUID | string
  campusName: string
  address: string
  email: string
  phones: string
}

export interface CampusHasCourseDB {
  campusId: UUID
  courseId: UUID
}

export interface CourseProgramDB {
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

export interface EnrollmentTypeDB {
  id: UUID
  enrollment: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
