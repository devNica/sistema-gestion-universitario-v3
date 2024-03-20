import { type OrganizationalUnitEntity, type AcademicCampusEntity, type CourseEntity } from '@backoffice/domain/entities/BackOfficeEntity'

export interface CampusRepositoryPort<T extends AcademicCampusEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'campusId'>>) => Promise<Pick<T, 'campusId'> | never>
  // fetch: (data: Partial<Pick<T, keyof T>>) => Promise<AcademicCampusEntity | never>
}

export interface OrgUnitRepositoryPort<T extends OrganizationalUnitEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'unitId'>>) => Promise<Pick<T, 'unitId'> | never>
}

export interface CourseRepositoryPort<T extends CourseEntity> {
  create: (data: Pick<T, Exclude<keyof T, 'courseId' | 'createdAt' | 'updatedAt'>>) => Promise<Pick<T, 'courseId'> | never>
}
