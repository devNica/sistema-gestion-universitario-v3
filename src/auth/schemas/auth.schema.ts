import Joi from 'joi'

export const registerUserCommonSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Correo es requerido',
    'string.base': 'El formato del correo es incorrecto',
    'string.email': 'La direccion de correo es invalida'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required().messages({
    'any.required': 'La contrasenia es requerida',
    'string.base': 'El formato de la contrasenia es incorrecto',
    'string.pattern.base': 'El formato de la contraseña es incorrecto',
    'string.min': 'La contraseña debe tener almenos 8 caracteres',
    'string.max': 'La contraseña no puede ser mayor a 15 caracteres'
  })
})

export const loginUserCommonSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Correo es requerido',
    'string.base': 'El formato del correo es incorrecto',
    'string.email': 'La direccion de correo es invalida'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required().messages({
    'any.required': 'La contrasenia es requerida',
    'string.base': 'El formato de la contrasenia es incorrecto',
    'string.pattern.base': 'El formato de la contraseña es incorrecto',
    'string.min': 'La contraseña debe tener almenos 8 caracteres',
    'string.max': 'La contraseña no puede ser mayor a 15 caracteres'
  })
})
