import Joi from 'joi'

export const campusRegistrationSchema: Joi.ObjectSchema = Joi.object({
  campusName: Joi.string().required().messages({
    'any.required': 'Nombre de la sede o campus requerido',
    'string.base': 'Formato del nombre de referencia es incorrecto'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Direccion de sede o campus requerida',
    'string.base': 'Formato del nombre de referencia es incorrecto'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Correo de contacto es requerido',
    'string.base': 'Formato de correo incorrecto',
    'string.email': 'Direccion de correo invalido'
  }),
  phones: Joi.array().items({
    tel: Joi.string()
  }).required().messages({
    'any.required': 'Lista de numeros de contacto requerido'
  })
})

export const knowledgedAreaRegistrationSchema: Joi.ObjectSchema = Joi.object({
  unitName: Joi.string().required().messages({
    'any.required': 'Nombre de unidad organizativa requerido',
    'string.base': 'Formato del nombre de la unidad es incorrecto'
  }),
  reference: Joi.string().required().messages({
    'any.required': 'Referencia de unidad organizativa requerido',
    'string.base': 'Formato de la referencia de la unidad es incorrecto'
  })
})

export const courseRegistrationSchema: Joi.ObjectSchema = Joi.object({
  courseName: Joi.string().required().messages({
    'any.required': 'Nombre del curso requerido',
    'string.base': 'Formato del nombre de curso incorrecto'
  }),
  reference: Joi.string().required().messages({
    'any.required': 'Referencia del curso es requerido',
    'string.base': 'Formato de la referencia del curso es incorrecto'
  }),
  unitId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'ID de asociacion a la unidad organizativa es requerido',
    'string.base': 'Formato del ID de asociacion es incorrecto'
  })
})

export const accademicOfferSchema: Joi.ObjectSchema = Joi.object({
  campusId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'ID de asociacion a la sede universitaria es requerido',
    'string.base': 'El ID de asociacion a la sede es incorrecto'
  }),
  courses: Joi.array().items({
    id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'any.required': 'ID de asociacion del curso a la sede es requerido',
      'string.base': 'Formato del ID de asociacion del curso a la sede es incorrecto'
    })
  }).required().messages({
    'any.required': 'Lista de cursos es requerida'
  })
})
