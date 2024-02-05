import { HttpStatusRecord } from '@core/models/http/http-response.model'
import { type ApplicationErrorOutputPort } from '@core/ports/output/errors/application-error-output.port'

export default class DefaultApplicationErrorPresenter extends Error implements ApplicationErrorOutputPort {
  public statusCode: number = HttpStatusRecord.internalServerErrorRequest
  public name: 'Default Application'
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
