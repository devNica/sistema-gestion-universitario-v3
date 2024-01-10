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

export const updateProfileUserSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.base': 'El formato del correo es incorrecto',
    'string.email': 'La direccion de correo es invalida'
  }),
  fullname: Joi.string().optional().messages({
    'string.base': 'El formato del nombre completo es invalido'
  }),
  phoneNumber: Joi.string().min(6).max(20).optional().messages({
    'string.base': 'El formato del numero movil es incorrecto',
    'string.min': 'El numero movil debe tener al menos 6 caracteres',
    'string.max': 'El numero movil no puede ser mayor a 15 caracteres'
  })
})
