import { HttpStatusRecord } from '@core/models/http/http-response.model'

export default class RepositoryValidationErrorPresenter extends Error {
  public statusCode: number = HttpStatusRecord.badRequest
  public name: 'Repository Validations'
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
