import { type UUID } from '@core/models/generic/custom-types.model'
import { type CourseIR, type CampusIR, type KnowledgeAreaIR, type CampusHasCourseIR } from '@org/models/repositories/repository-input.model'
import { type CourseOR } from '@org/models/repositories/repository-output.model'

export interface InsertCampusOP {
  insertCampus: (dto: CampusIR) => Promise<void | never>
}

export interface InsertKnowledgeAreaOP {
  insertKnowledgeArea: (dto: KnowledgeAreaIR) => Promise<void | never>
}

export interface InsertCourseOP {
  insertCourse: (dto: CourseIR) => Promise<void | never>
}

export interface FetchCoursetByKnowledgeAreaOP {
  fetchCourseByKnowledgeArea: (id: UUID) => Promise<CourseOR[] | never>
}

export interface InsertCampusCoursesOP {
  insertCampusCourses: (dto: CampusHasCourseIR) => Promise<void | never>
}
