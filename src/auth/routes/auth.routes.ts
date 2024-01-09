/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCommonUserFactory } from '@auth/factories/reg-common-user.factory'
import { registerUserCommonSchema } from '@auth/schemas/auth.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const authRouter: Router = Router()

authRouter.post('/',
  expressMiddlewareAdapter(validatorSchemaFactory(registerUserCommonSchema)),
  expressRouteAdapter(registerCommonUserFactory))

export default authRouter
