import { type CourseEntity, type CampusEntity, type OrganizationalUnitEntity } from '@core/models/entities/organization-unit.entity'
import { type UUID } from '@core/models/generic/custom-types.model'

export type CampusIC = Pick<CampusEntity, 'email' | 'address' | 'phones' | 'campusName'>

export type OrganizationalUnitIC = Pick<OrganizationalUnitEntity, 'unitName' | 'reference'>

export type CourseIC = Pick<CourseEntity, 'courseName' | 'reference' | 'unitId'>

export interface AcademicOfferIC {
  courses: Array<Pick<CourseEntity, 'id'>>
  campusId: UUID
}
