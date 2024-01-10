import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class ServiceValidationErrorPresenter extends Error {
  public statusCode: number = HttpStatusRecord.badRequest
  public name: 'Service Validations'
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
