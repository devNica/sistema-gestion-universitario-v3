/* eslint-disable @typescript-eslint/no-misused-promises */
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { courseByKnowledgeAreaFactory } from '@org/factories/course-by-knowledge-area-list.factory'
import { courseRegistrationFactory } from '@org/factories/course-registration.factory'
import { knowledgeAreaRegFactory } from '@org/factories/knowledge-area-registration.factory'
import { campusRegistrationFactory } from '@org/factories/organization-registration.factory'
import { registerAcademicOfferFactory } from '@org/factories/register-academic-offer.factory'
import { accademicOfferSchema, campusRegistrationSchema, courseRegistrationSchema, knowledgedAreaRegistrationSchema } from '@org/schemas/organization.schema'
import { Router } from 'express'

const organizationRouter = Router()

organizationRouter.post('/campus',
  expressMiddlewareAdapter(validatorSchemaFactory(campusRegistrationSchema)),
  expressRouteAdapter(campusRegistrationFactory))

organizationRouter.post('/campus/:id/course',
  expressMiddlewareAdapter(validatorSchemaFactory(accademicOfferSchema)),
  expressRouteAdapter(registerAcademicOfferFactory))

organizationRouter.post('/knowledge-area',
  expressMiddlewareAdapter(validatorSchemaFactory(knowledgedAreaRegistrationSchema)),
  expressRouteAdapter(knowledgeAreaRegFactory))

organizationRouter.post('/course',
  expressMiddlewareAdapter(validatorSchemaFactory(courseRegistrationSchema)),
  expressRouteAdapter(courseRegistrationFactory))

organizationRouter.get('/knowledge-area/:id/course',
  expressRouteAdapter(courseByKnowledgeAreaFactory))

export default organizationRouter
