import { checkAgeRequirement } from '@core/shared/utils/check-age'
import Joi from 'joi'

export const userLoginSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Nombre de usuario es requerido',
    'string.base': 'Formato del nombre de usuario incorrecto'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!*?&]{8,15}$/).required().messages({
    'any.required': 'Contraseña es requerida',
    'string.base': 'Formato de contraseña incorrecto',
    'string.pattern.base': 'Patron de seguridad de contraseña invalido',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.max': 'La contraseña no debe exceder los 15 caracteres'
  })
})

export const resetUserAccountPasswordSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Nombre de usuario es requerido',
    'string.base': 'Formato del nombre de usuario incorrecto'
  }),
  newPassword: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!*?&]{8,15}$/).required().messages({
    'any.required': 'La nueva contraseña es requerida',
    'string.base': 'El formato de la nueva contraseña es incorrecto',
    'string.pattern.base': 'Patron de seguridad de nueva contraseña invalido',
    'string.min': 'La nueva contraseña debe tener al menos 8 caracteres',
    'string.max': 'La nueva contraseña no debe exceder los 15 caracteres'
  }),
  prevPassword: Joi.string().optional().messages({
    'any.required': 'La contraseña anterior es requerida',
    'string.base': 'Formato de contraseña anterior incorrecto'
  })
  // profileId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
  //   'any.required': 'ID de asociacion al perfil es requerido',
  //   'string.base': 'El ID del perfil es incorrecto'
  // })
})

export const applicantInformationSchema: Joi.ObjectSchema = Joi.object({
  personalEmail: Joi.string().email().required().messages({
    'any.required': 'Correo del postulante es requerido',
    'string.base': 'Formato de correo incorrecto',
    'string.email': 'Direccion de correo invalido'
  }),
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
  }),
  initAccu: Joi.number().precision(2).required().messages({
    'any.required': 'Acumulado inicial es requerido',
    'number.base': 'El acumulado inicial debe ser una cifra numerica'
  })

})

export const profesorInformationSchema: Joi.ObjectSchema = Joi.object({
  personalEmail: Joi.string().email().required().messages({
    'any.required': 'Correo del postulante es requerido',
    'string.base': 'Formato de correo incorrecto',
    'string.email': 'Direccion de correo invalido'
  }),
  firstname: Joi.string().regex(/^[^\d]+$/).required().messages({
    'any.required': 'Nombre del postulante es requerido',
    'string.base': 'Nombre no puede contener digitos'
  }),
  lastname: Joi.string().regex(/^[^\d]+$/).required().messages({
    'any.required': 'Apellido del postulante es requerido',
    'string.pattern.base': 'Apellido no puede contener digitos'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!*?&]{8,15}$/).required().messages({
    'any.required': 'Contraseña es requerida',
    'string.base': 'Formato de contraseña incorrecto',
    'string.pattern.base': 'Patron de seguridad de contraseña invalido',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.max': 'La contraseña no debe exceder los 15 caracteres'
  })
})
