/* eslint-disable @typescript-eslint/no-misused-promises */
import { knowledgeAreaRegistrationFactory } from '@backoffice/factory/knowledge-area-registration.factory'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const knowledgeAreaRouter = Router()

knowledgeAreaRouter.post('/',
  expressRouteAdapter(knowledgeAreaRegistrationFactory))

export default knowledgeAreaRouter
