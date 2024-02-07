import { checkAgeRequirement } from '@core/shared/utils/check-age'
import Joi from 'joi'

export const userAccountRegistrationSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Correo es requerido',
    'string.base': 'Formato de correo incorrecto',
    'string.email': 'Direccion de correo invalido'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required().messages({
    'any.required': 'Password es requerido',
    'string.base': 'Formato del password es requerido',
    'string.pattern.base': 'Formato del password es requerido',
    'string.min': 'El password debe tener al menos 8 caracteres',
    'string.max': 'El password no debe exceder los 15 caracteres'
  }),
  profileId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'ID de asociacion al perfil es requerido',
    'string.base': 'El ID del perfil es incorrecto'
  })
})

export const userprofileRegistrationSchema: Joi.ObjectSchema = Joi.object({
  firstname: Joi.string().regex(/^[^\d]+$/).required().messages({
    'any.required': 'Nombre del postulante es requerido',
    'string.base': 'Nombre no puede contener digitos'
  }),
  lastname: Joi.string().regex(/^[^\d]+$/).required().messages({
    'any.required': 'Apellido del postulante es requerido',
    'string.pattern.base': 'Apellido no puede contener digitos'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Direccion es requerida',
    'string.base': 'Formato de la direccion es incorrecto'
  }),
  birthdate: Joi.string().custom(checkAgeRequirement).required().messages({
    'date.invalid': 'La edad del postulante debe ser mayor de 15 años ',
    'any.required': 'La edad del postulante es requisito',
    'date.base': 'El formato de la edad es incorrecto',
    'date.future': 'La fecha de nacimiento esta prevista en el futuro'
  }),
  dni: Joi.string().required().messages({
    'any.required': 'Direccion del postulante es requerida',
    'string.base': 'Formato de la direccion es incorrecto'
  }),
  nationality: Joi.string().regex(/^[^\d]+$/).required().messages({
    'any.required': 'Nacionalidad del postulante es requerida',
    'string.pattern.base': 'La nacionalidad no puede contener digitos'
  }),
  phoneNumber: Joi.string().regex(/^\+(?:\d\s?){10,}$/).required().messages({
    'any.required': 'Numero telefonico del postulante es requerido',
    'string.pattern.base': 'Formato del numero telefonico es incorrecto'
  })
})
