import { HttpStatusRecord, type HttpStatusResponseType } from '@core/models/http/http-response.model'

export default class ServiceValidationErrorPresenter extends Error {
  public readonly name: 'Error in Validation Service'
  public readonly statusCode: number

  constructor (httpStatus: HttpStatusResponseType, message?: string) {
    super(message)
    this.message = message ?? this.name
    this.statusCode = HttpStatusRecord[`${httpStatus}`]
  }
}
