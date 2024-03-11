import { type UUID } from '@core/models/generic/custom-types.model'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type AcademicOfferIC, type CampusIC, type CourseIC, type OrganizationalUnitIC } from '@org/domain/models/controllers/controller-input.model'
import { type CourseOC } from '@org/domain/models/controllers/controller-output.model'

export interface CampusRegistrationIP {
  campusReg: (request: CampusIC) => Promise<EmptyResponseModel>
}

export interface CourseListIP {
  courseByKnowledgeAreaList: (areaId: UUID) => Promise<CourseOC>
}

export interface CourseRegistrationIP {
  courseReg: (request: CourseIC) => Promise<EmptyResponseModel>
}

export interface KnowledgeAreaIP {
  knowledgeAreaReg: (request: OrganizationalUnitIC) => Promise<EmptyResponseModel>
}

export interface RegisterAcademicOfferIP {
  registerAcademicOffer: (request: AcademicOfferIC) => Promise<EmptyResponseModel>
}
