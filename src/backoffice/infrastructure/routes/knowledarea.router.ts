/* eslint-disable @typescript-eslint/no-misused-promises */
import { getCoursesByKnowledgeAreaFactory } from '@backoffice/factory/get-course-by-knowledge-area.factory'
import { knowledgeAreaRegistrationFactory } from '@backoffice/factory/knowledge-area-registration.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const knowledgeAreaRouter = Router()

knowledgeAreaRouter.post('/',
  expressRouteAdapter(knowledgeAreaRegistrationFactory))

knowledgeAreaRouter.get('/:id/course',
  expressRouteAdapter(getCoursesByKnowledgeAreaFactory))

export default knowledgeAreaRouter
