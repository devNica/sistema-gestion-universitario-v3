/* eslint-disable @typescript-eslint/no-misused-promises */
import { resetUserAccountPasswordFactory } from '@auth/factories/reset-useraccount-password.factory'
import { universitaryApplicantRegistrationFactory } from '@auth/factories/universitary-applicant-registration.factory'
import { universityProfessorRegistrationFactory } from '@auth/factories/university-professor-registration.factory'
import { userLoginFactory } from '@auth/factories/user-login.factory'
import { applicantInformationSchema, profesorInformationSchema, resetUserAccountPasswordSchema, userLoginSchema } from '@auth/schemas/useraccount.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login',
  expressMiddlewareAdapter(validatorSchemaFactory(userLoginSchema)),
  expressRouteAdapter(userLoginFactory))

authRouter.post('/register/applicant',
  expressMiddlewareAdapter(validatorSchemaFactory(applicantInformationSchema)),
  expressRouteAdapter(universitaryApplicantRegistrationFactory))

authRouter.post('/register/professor',
  expressMiddlewareAdapter(validatorSchemaFactory(profesorInformationSchema)),
  expressRouteAdapter(universityProfessorRegistrationFactory))

authRouter.patch('/password/applicant',
  expressMiddlewareAdapter(validatorSchemaFactory(resetUserAccountPasswordSchema)),
  expressRouteAdapter(resetUserAccountPasswordFactory))

export default authRouter
