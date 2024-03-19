import { serializeErrorStack } from '@core/shared/utils/serialized-error-stack'
import { type HttpRequestModel } from '../models/http/http-request.model'
import { type MiddlewareRequestModel } from '../models/middlewares/middleware.model'
import { type JoiSchemaModel, type JoiValidationResultModel, type JoiErrorDetailsModel } from '../models/validations/joi-validation.model'
import { type MiddlewareInputPort } from '../ports/middleware-input.port'
import { type JoiValidationSchemaInputPort } from '../ports/validation-input.port'
import RequestValidationErrorPresenter from '../presenter/request-validation.presenter'

export class JoiValidationService <T> implements MiddlewareInputPort, JoiValidationSchemaInputPort {
  constructor (
    private readonly schema: JoiSchemaModel<T>
  ) {}

  async validate <T>(schema: JoiSchemaModel<any>, request: HttpRequestModel): Promise<JoiValidationResultModel<T>> {
    return await schema.validateAsync(request.body, { abortEarly: false, allowUnknown: true })
  }

  async handleRequest (request: MiddlewareRequestModel): Promise<void> {
    try {
      await this.validate(this.schema, request)
    } catch (error: any) {
      const details: JoiErrorDetailsModel[] = error.details
      throw new RequestValidationErrorPresenter(serializeErrorStack(details))
    }
  }
}
