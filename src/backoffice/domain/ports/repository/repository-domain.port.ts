import { type OrganizationalUnitEntity, type AcademicCampusEntity, type CourseEntity } from '@backoffice/domain/entities/BackOfficeEntity'

export interface CampusRepositoryPort<T extends AcademicCampusEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'campusId' | 'linkCourses' | 'courses'>>) => Promise<Pick<T, 'campusId'> | never>
  fetchCourses: (data: Partial<Pick<T, 'campusId'>>) => Promise<Pick<T, 'courses'> | never>
  joinCourses: (data: Pick<T, 'campusId' | 'linkCourses'>) => Promise<void | never>
}

export interface OrgUnitRepositoryPort<T extends OrganizationalUnitEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'unitId' | 'courses'>>) => Promise<Pick<T, 'unitId'> | never>
  fetchCourses: (data: Pick<T, 'unitId'>) => Promise<Pick<T, 'courses'>>
}

export interface CourseRepositoryPort<T extends CourseEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'courseId' | 'createdAt' | 'updatedAt'>>) => Promise<Pick<T, 'courseId'> | never>
}
