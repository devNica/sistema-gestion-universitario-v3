import { type HttpRequestModel } from '../models/http/http-request.model'
import { type JoiSchemaModel, type JoiValidationResultModel } from '../models/validations/joi-validation.model'

export interface JoiValidationSchemaInputPort {
  validate: <T>(schema: JoiSchemaModel<T>, request: HttpRequestModel) => Promise<JoiValidationResultModel<T>>
}
