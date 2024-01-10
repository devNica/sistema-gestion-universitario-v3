import { type NextFunction, type Request, type Response } from 'express'
import { DefaultApplicationErrorAdapter } from '../errors/default-application-error.adapter'
import RequestValidationErrorPresenter from '../presenters/req-validation-error.presenter'
import ServiceValidationErrorPresenter from '../presenters/service-validation-error.presenter'
import RepositoryValidationErrorPresenter from '../presenters/repository-validation-error.presenter'

export function expressAsyncErrorAdapter
(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof DefaultApplicationErrorAdapter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name,
          messages: error.messages
        }
      })
  }
  if (error instanceof RequestValidationErrorPresenter || error instanceof ServiceValidationErrorPresenter || error instanceof RepositoryValidationErrorPresenter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name,
          messages: error.messages
        }
      })
  }
}
