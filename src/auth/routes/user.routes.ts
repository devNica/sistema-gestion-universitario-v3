/* eslint-disable @typescript-eslint/no-misused-promises */

import { userProfileRegistrationFactory } from '@auth/factories/userprofile-registration.factory'
import { userprofileRegistrationSchema } from '@auth/schemas/useraccount.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/profile',
  expressMiddlewareAdapter(validatorSchemaFactory(userprofileRegistrationSchema)),
  expressRouteAdapter(userProfileRegistrationFactory))

export default userRouter
