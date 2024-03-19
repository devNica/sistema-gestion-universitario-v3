import { dateRegex } from '@core/domain/models/customs/custom-types.model'
import type Joi from 'joi'
import { type ErrorReport } from 'joi'

export function checkAgeRequirement (age: string, helpers: Joi.CustomHelpers): ErrorReport | string {
  if (!dateRegex.test(age)) {
    return helpers.error('string.base')
  }

  // obtener fecha actual
  const currenDate = new Date()

  // convertir fecha de nacimiento proporcionada a un objeto de fecha
  const birthdate = new Date(age)

  // verificar si la fecha es valida
  if (birthdate.toString() === 'Invalid Date') {
    return helpers.error('date.base')
  }

  // calcular diferencia de tiempo en milisegundos
  const timeDiff = currenDate.getTime() - birthdate.getTime()

  if (timeDiff < 0) {
    return helpers.error('date.future')
  }

  // convertir diferencia de tiempo a anios
  const calculatedAge = timeDiff / (1000 * 3600 * 24 * 365.25)

  // validar edad
  if (calculatedAge > 15) {
    return age
  } else {
    return helpers.error('date.invalid')
  }
}
