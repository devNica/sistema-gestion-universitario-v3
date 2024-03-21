import Joi from 'joi'

export const campusRegistrationSchema: Joi.ObjectSchema = Joi.object({
  campusName: Joi.string().required().messages({
    'any.required': 'Nombre de recinto requerido',
    'string.base': 'Formato del nombre de recinto incorrecto'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Direccion del recinto es requerido',
    'string.base': 'Formato de direccion del recinto incorrecta'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Direccion de correo requerido',
    'string.base': 'Formato o direccion de correo invalida',
    'string.email': 'Formato o direccion de correo invalida'
  }),
  phones: Joi.array().items({
    tel: Joi.string().required().messages({
      'any.required': 'Numero telefonico requerido',
      'string.base': 'Formato del numero telefonico requerido'
    })
  }).required().messages({
    'any.required': 'Lista de numeros telefonicos requerida'
  })
})

export const courseRegistrationSchema: Joi.ObjectSchema = Joi.object({
  courseName: Joi.string().required().messages({
    'any.required': 'Nombre de curso requerido',
    'string.base': 'Formato del nombre del curso incorrecto'
  }),
  reference: Joi.string().required().messages({
    'any.required': 'Referencia del curso requerido',
    'string.base': 'Formato de referencia incorrecto'
  }),
  unitId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'ID de asociacion al area de conocimiento es requerido',
    'string.base': 'ID del area de conocimiento es incorrecto',
    'string.guid': 'ID del area de conocimiento es incorrecto'
  })
})

export const linkCoursesToCampusSchema: Joi.ObjectSchema = Joi.object({
  courses: Joi.array().items({
    courseId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'any.required': 'Id de curso requerido',
      'string.base': 'Formato del ID del curso Incorrecto',
      'string.guid': 'Formato del ID del curso Incorrecto'
    })
  }).required()
})
