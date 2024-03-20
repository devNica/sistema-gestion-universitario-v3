/* eslint-disable @typescript-eslint/no-misused-promises */
import { campusRegistrationSchema } from '@backoffice/application/schemas/backoffice.schema'
import { campusRegistrationFactory } from '@backoffice/factory/campus-registration.factory'
import { validatorSchemaFactory } from '@core/factory/validator-schema.factory'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const campusRouter = Router()

campusRouter.post('/campus',
  expressMiddlewareAdapter(validatorSchemaFactory(campusRegistrationSchema)),
  expressRouteAdapter(campusRegistrationFactory))

export default campusRouter
