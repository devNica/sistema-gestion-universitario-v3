export interface OrganizationalUnitDB {
  id: string
  unitName: string
  reference: string
  createdAt: Date
  updatedAt: Date
}

export interface CourseDB {
  id: string
  courseName: string
  reference: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  unitId: string
}

export interface CampusDB {
  id: string
  campusName: string
  address: string
  email: string
  phones: Array<{ tel: string }>
}

export interface CampusHasCourseDB {
  campusId: string
  courseId: string
}

export interface CourseProgramDB {
  id: string
  plan: string
  programRef: string
  isCurrentPlan: boolean
  availableForNewEntry: boolean
  availableForReEntry: boolean
  replaceBy: string
  isActive: boolean
  courseId: string
  createdAt: Date
  updatedAt: Date
}

export interface EnrollmentTypeDB {
  id: string
  enrollment: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
