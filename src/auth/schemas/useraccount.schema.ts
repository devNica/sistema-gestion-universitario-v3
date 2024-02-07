import Joi from 'joi'

export const userAccountRegistrationSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.base': 'Email format is wrong',
    'string.email': 'Email address invalid'
  }),
  password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password format is wrong',
    'string.pattern.base': 'Password format is wrong',
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password cannot exceed 15 characters'
  }),
  profileId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'Profile association ID is required',
    'string.base': 'wrong profile id format'
  })
})
