import type Joi from 'joi'

export type JoiSchemaModel<T> = Joi.ObjectSchema<T>
export type JoiValidationResultModel<T> = Joi.ValidationResult<T>

export interface JoiErrorDetailsModel {
  message: string
  path: any
  type: string
  context: any
}
