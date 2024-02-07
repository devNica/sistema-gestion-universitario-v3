import { type JoiErrorDetailsModel } from '@core/models/validations/joi-validation.model'

export const serializeErrorStack = (stack: JoiErrorDetailsModel[]): string => {
  return stack.map(e => e.message).join(', ')
}
