/* eslint-disable @typescript-eslint/no-misused-promises */
import { guestUserSchema, professorUserSchema, resetUserAccountPasswordSchema, userLoginSchema } from '@auth/application/schemas/useraccount.schema'
import { authenticateAdminFactory } from '@auth/factory/auth-middleware.factory'
import { guestUserRegistrationFactory } from '@auth/factory/guest-user-registration.factory'
import { professorUserRegistrationFactory } from '@auth/factory/professor-user-registration.factory'
import { promoteGuestUserToStudentFactory } from '@auth/factory/promote-guest-user-to-student.factory'
import { refreshTokenFactory } from '@auth/factory/refresh-token.factory'
import { resetUserAccountPasswordFactory } from '@auth/factory/reset-password.factory'
import { userLoginFactory } from '@auth/factory/user-login.factory'
import { validatorSchemaFactory } from '@core/factory/validator-schema.factory'
import { expressMiddlewareAdapter } from '@core/infrastructure/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/infrastructure/express/express-route.adapter'
import { Router } from 'express'

const authenticationRouter = Router()

authenticationRouter.post('/login',
  expressMiddlewareAdapter(validatorSchemaFactory(userLoginSchema)),
  expressRouteAdapter(userLoginFactory)
)

authenticationRouter.post('/guest',
  expressMiddlewareAdapter(validatorSchemaFactory(guestUserSchema)),
  expressRouteAdapter(guestUserRegistrationFactory))

authenticationRouter.patch('/guest/:userId/to-student',
  expressRouteAdapter(promoteGuestUserToStudentFactory))

authenticationRouter.post('/professor',
  expressMiddlewareAdapter(authenticateAdminFactory),
  expressMiddlewareAdapter(validatorSchemaFactory(professorUserSchema)),
  expressRouteAdapter(professorUserRegistrationFactory))

authenticationRouter.put('/refresh-token/:userId', expressRouteAdapter(refreshTokenFactory))

authenticationRouter.patch('/password',
  expressMiddlewareAdapter(validatorSchemaFactory(resetUserAccountPasswordSchema)),
  expressRouteAdapter(resetUserAccountPasswordFactory))

export default authenticationRouter
