import { type CourseIC, type OrganizationalUnitIC, type CampusIC, type AcademicOfferIC } from '../controllers/controller-input.model'

export type CampusIR = Required<CampusIC>

export type KnowledgeAreaIR = Required<OrganizationalUnitIC>

export type CourseIR = Required<CourseIC>

export type CampusHasCourseIR = Required<AcademicOfferIC>
