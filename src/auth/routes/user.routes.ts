/* eslint-disable @typescript-eslint/no-misused-promises */

import { userProfileRegistrationFactory } from '@auth/factories/userprofile-registration.factory'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/profile', expressRouteAdapter(userProfileRegistrationFactory))

export default userRouter
