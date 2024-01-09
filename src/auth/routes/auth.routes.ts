/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCommonUserFactory } from '@auth/factories/reg-common-user.factory'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { Router } from 'express'

const authRouter: Router = Router()

authRouter.post('/', expressRouteAdapter(registerCommonUserFactory))

export default authRouter
