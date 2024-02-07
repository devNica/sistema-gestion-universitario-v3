/* eslint-disable @typescript-eslint/no-misused-promises */
import { universitaryApplicantRegistrationFactory } from '@auth/factories/universitary-applicant-registration.factory'
import { applicantInformationSchema } from '@auth/schemas/useraccount.schema'
import { expressMiddlewareAdapter } from '@core/adapters/primary/express/express-middleware.adapter'
import { expressRouteAdapter } from '@core/adapters/primary/express/express-route.adapter'
import { validatorSchemaFactory } from '@core/adapters/primary/factory/validator-schema.factory'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/register/applicant',
  expressMiddlewareAdapter(validatorSchemaFactory(applicantInformationSchema)),
  expressRouteAdapter(universitaryApplicantRegistrationFactory))

export default authRouter
