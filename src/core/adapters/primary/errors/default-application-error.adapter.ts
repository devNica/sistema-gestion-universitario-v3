import { type ApplicationErrorModel } from '@core/models/errors/application-error.model'

export class DefaultApplicationErrorAdapter extends Error implements ApplicationErrorModel {
  public statusCode: number = 500
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message ?? this.name
    this.messages.push(this.message)
  }
}
