/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type JoiSchemaModel } from '@core/models/validations/joi-validation.model'
import { JoiValidationService } from '@core/services/validations/joi-validation.service'

export function validatorSchemaFactory <T> (schema: JoiSchemaModel<T>) {
  return new JoiValidationService(schema)
}
