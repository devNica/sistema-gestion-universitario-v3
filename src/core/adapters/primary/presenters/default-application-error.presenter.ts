import { HttpStatusRecord } from '@core/models/http/http-response.model'
import { type ApplicationErrorOutputPort } from '@core/ports/output/errors/application-error-output.port'

export default class DefaultApplicationErrorPresenter extends Error implements ApplicationErrorOutputPort {
  public readonly name: 'Default Error in Application'
  public readonly statusCode: number = HttpStatusRecord.internalServerErrorRequest

  constructor (message?: string) {
    super(message)
    this.message = message ?? this.name
  }
}
