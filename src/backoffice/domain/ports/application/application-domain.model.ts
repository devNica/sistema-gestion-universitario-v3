export interface CampusRegistrationModel {
  campusName: string
  address: string
  email: string
  phones: Array<{ tel: string }>
}

export interface KnowledgeAreaRegistrationModel {
  unitName: string
  reference: string
}

export interface CourseRegistrationModel {
  courseName: string
  reference: string
  unitId: string
}

export interface LinkCoursesToCampusModel {
  campusId: string
  courses: Array<{ courseId: string }>
}

export interface FoundCoursesModel {
  courseId: string
  courseName: string
  reference: string
  isActive: boolean
}
