import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type JoiSchemaModel, type JoiValidationResultModel } from '@core/models/validations/joi-validation.model'

export interface JoiValidationSchemaInputPort {
  validate: <T>(schema: JoiSchemaModel<T>, request: HttpRequestModel) => Promise<JoiValidationResultModel<T>>
}
