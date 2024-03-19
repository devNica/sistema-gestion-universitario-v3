import DefaultApplicationErrorPresenter from '@core/application/presenter/default-application-error.presenter'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { type NextFunction, type Request, type Response } from 'express'

export function expressErrorAdapter
(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof DefaultApplicationErrorPresenter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name
        }
      })
  }
  if (error instanceof InternalServerErrorPresenter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name
        }
      })
  }
  if (error instanceof RequestValidationErrorPresenter || error instanceof ServiceValidationErrorPresenter || error instanceof RepositoryValidationErrorPresenter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name
        }
      })
  }
}
