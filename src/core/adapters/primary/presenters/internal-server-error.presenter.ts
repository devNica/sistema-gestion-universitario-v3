import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class InternalServerErrorPresenter extends Error {
  public statusCode: number = HttpStatusRecord.internalServerErrorRequest
  public name: 'Internal Server'
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
