import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class GenericErrorPresenter extends Error {
  public readonly name: string = 'Unspecified Error'
  public readonly statusCode: number = HttpStatusRecord.badRequest

  constructor (message?: string) {
    super(message)
    this.message = message ?? this.name
  }
}
