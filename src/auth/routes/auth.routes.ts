/* eslint-disable @typescript-eslint/no-misused-promises */
import { userAccountRegistrationFactory } from '@auth/factories/useraccount-registration.factory'
import { userAccountRegistrationSchema } from '@auth/schemas/useraccount.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/signup',
  expressMiddlewareAdapter(validatorSchemaFactory(userAccountRegistrationSchema)),
  expressRouteAdapter(userAccountRegistrationFactory))

export default authRouter
