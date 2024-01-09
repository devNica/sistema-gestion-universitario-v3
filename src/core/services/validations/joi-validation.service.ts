import { type ExpressMiddlewareModel } from '@core/models/middleware/express-middleware.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type JoiErrorDetailsModel, type JoiSchemaModel, type JoiValidationResultModel } from '@core/models/validations/joi-validation.model'
import { type JoiValidationSchemaInputPort } from '@core/ports/input/joi-validation-input.port'
import { type MiddlewareInputPort } from '@core/ports/input/middleware-input.port'
import { RequestValidationErrorAdapter } from '@core/adapters/primary/errors/request-validation-error.adapter'
import { serializeErrorStack } from '@core/shared/utils/serialized-error-stack'

export class JoiValidationService <T> implements MiddlewareInputPort, JoiValidationSchemaInputPort {
  constructor (
    private readonly schema: JoiSchemaModel<T>
  ) {}

  async validate <T>(schema: JoiSchemaModel<any>, request: HttpRequestModel): Promise<JoiValidationResultModel<T>> {
    return await schema.validateAsync(request.body, { abortEarly: false, allowUnknown: true })
  }

  async handleRequest (request: ExpressMiddlewareModel): Promise<void> {
    try {
      await this.validate(this.schema, request)
    } catch (error: any) {
      const details: JoiErrorDetailsModel[] = error.details
      throw new RequestValidationErrorAdapter(serializeErrorStack(details))
    }
  }
}
