/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type JoiSchemaModel } from '@core/application/models/validations/joi-validation.model'
import { JoiValidationService } from '@core/application/service/joi-validation.service'

export function validatorSchemaFactory <T> (schema: JoiSchemaModel<T>) {
  return new JoiValidationService(schema)
}
