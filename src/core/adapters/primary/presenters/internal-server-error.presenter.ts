import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class InternalServerErrorPresenter extends Error {
  public readonly name: 'Error From Server'
  public readonly statusCode: number = HttpStatusRecord.internalServerErrorRequest

  constructor (message?: string) {
    super(message)
    this.message = message ?? this.name
  }
}
