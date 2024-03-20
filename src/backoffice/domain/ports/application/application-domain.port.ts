import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type KnowledgeAreaRegistrationModel, type CampusRegistrationModel, type CourseRegistrationModel } from './application-domain.model'

export interface CampusRegistrationPort {
  register: (data: CampusRegistrationModel) => Promise<EmptyResponseModel>
}

export interface KnowledgeAreaRegistrationPort {
  register: (data: KnowledgeAreaRegistrationModel) => Promise<EmptyResponseModel>
}

export interface CourseRegistrationPort {
  register: (data: CourseRegistrationModel) => Promise<EmptyResponseModel>
}
