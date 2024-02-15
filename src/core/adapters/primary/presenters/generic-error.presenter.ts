import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class GenericErrorPresenter extends Error {
  public statusCode: number = HttpStatusRecord.badRequest
  public messages: string[] = []
  public name: string = ''

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
