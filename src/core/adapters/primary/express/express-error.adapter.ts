import { type NextFunction, type Request, type Response } from 'express'
import RequestValidationErrorPresenter from '../presenters/req-validation-error.presenter'
import ServiceValidationErrorPresenter from '../presenters/service-validation-error.presenter'
import RepositoryValidationErrorPresenter from '../presenters/repository-validation-error.presenter'
import DefaultApplicationErrorPresenter from '../presenters/default-application-error.presenter'
import InternalServerErrorPresenter from '../presenters/internal-server-error.presenter'

export function expressAsyncErrorAdapter
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
