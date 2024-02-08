import { HttpStatusRecord, type HttpStatusResponseType } from '@core/models/http/http-response.model'

export default class ServiceValidationErrorPresenter extends Error {
  public statusCode: number
  public name: 'Service Validations'
  public messages: string[] = []

  constructor (message: string, httpStatus: HttpStatusResponseType = 'badRequest') {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
    this.statusCode = HttpStatusRecord[`${httpStatus}`]
  }
}
