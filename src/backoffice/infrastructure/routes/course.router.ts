/* eslint-disable @typescript-eslint/no-misused-promises */
import { courseRegistrationSchema } from '@backoffice/application/schemas/backoffice.schema'
import { courseRegistrationFactory } from '@backoffice/factory/course-registration.factory'
import { validatorSchemaFactory } from '@core/factory/validator-schema.factory'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const courseRouter = Router()

courseRouter.post('/',
  expressMiddlewareAdapter(validatorSchemaFactory(courseRegistrationSchema)),
  expressRouteAdapter(courseRegistrationFactory))

export default courseRouter
