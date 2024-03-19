import { type JoiErrorDetailsModel } from '@core/application/models/validations/joi-validation.model'

export const serializeErrorStack = (stack: JoiErrorDetailsModel[]): string => {
  return stack.map(e => e.message).join(', ')
}
