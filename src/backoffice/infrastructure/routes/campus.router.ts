/* eslint-disable @typescript-eslint/no-misused-promises */
import { campusRegistrationSchema, linkCoursesToCampusSchema } from '@backoffice/application/schemas/backoffice.schema'
import { campusRegistrationFactory } from '@backoffice/factory/campus-registration.factory'
import { linkCoursesToCampusFactory } from '@backoffice/factory/link-courses-to-campus.factory'
import { validatorSchemaFactory } from '@core/factory/validator-schema.factory'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const campusRouter = Router()

campusRouter.post('/',
  expressMiddlewareAdapter(validatorSchemaFactory(campusRegistrationSchema)),
  expressRouteAdapter(campusRegistrationFactory))

campusRouter.post('/:id/course',
  expressMiddlewareAdapter(validatorSchemaFactory(linkCoursesToCampusSchema)),
  expressRouteAdapter(linkCoursesToCampusFactory))

export default campusRouter
