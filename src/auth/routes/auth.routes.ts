/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCommonUserFactory } from '@auth/factories/reg-common-user.factory'
import { loginCommonUserFactory } from '@auth/factories/signin-common-user.factory'
import { updateProfileUserFactory } from '@auth/factories/upd-profile-user.factory'
import { loginUserCommonSchema, registerUserCommonSchema, updateProfileUserSchema } from '@auth/schemas/auth.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const authRouter: Router = Router()

authRouter.post('/signup',
  expressMiddlewareAdapter(validatorSchemaFactory(registerUserCommonSchema)),
  expressRouteAdapter(registerCommonUserFactory))

authRouter.post('/login',
  expressMiddlewareAdapter(validatorSchemaFactory(loginUserCommonSchema)),
  expressRouteAdapter(loginCommonUserFactory))

authRouter.patch('/profile/:userId',
  expressMiddlewareAdapter(validatorSchemaFactory(updateProfileUserSchema)),
  expressRouteAdapter(updateProfileUserFactory))

export default authRouter
