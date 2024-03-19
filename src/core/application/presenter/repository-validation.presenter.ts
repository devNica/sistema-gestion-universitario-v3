import { HttpStatusRecord } from '../models/http/http-response.model'

export default class RepositoryValidationErrorPresenter extends Error {
  public readonly name: 'Error in Repository'
  public readonly statusCode: number = HttpStatusRecord.badRequest

  constructor (message?: string) {
    super(message)
    this.message = message ?? this.name
  }
}
