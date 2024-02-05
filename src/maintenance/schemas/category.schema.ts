import Joi from 'joi'

export const registerCommonCategorySchema: Joi.ObjectSchema = Joi.object({
  category: Joi.string().required().messages({
    'any.required': 'Categoria es requerido',
    'string.empty': 'La categoria no puede ser una cadena vacia',
    'string.base': 'El formato de la categoria es incorrecto'
  }),
  parentRef: Joi.string().optional().messages({
    'string.base': 'El formato de la referencia de la categoria padre es incorrecto'
  }),
  flow: Joi.number().integer().positive().max(1).required().messages({
    'number.base': 'El formato del control del flujo es incorrecto',
    'any.required': 'El control de flujo es requerido',
    'number.empty': 'El control de flujo es requerido',
    'number.max': 'El control de flujo solo acepta los valores 0 o 1'
  })
})
