/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCommonCategoryFactory } from '@maintenance/factories/reg-common-category.factory'
import { registerCommonCategorySchema } from '@maintenance/schemas/category.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const maintenanceRouter: Router = Router()

maintenanceRouter.post('/category/common',
  expressMiddlewareAdapter(validatorSchemaFactory(registerCommonCategorySchema)),
  expressRouteAdapter(registerCommonCategoryFactory))

export default maintenanceRouter
