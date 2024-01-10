import { type ApplicationErrorModel } from '@core/models/errors/application-error.model'
import { type MiddlewareInputPort } from '@core/ports/input/middleware-input.port'
import { type NextFunction, type Request, type Response } from 'express'

export function expressMiddlewareAdapter (middleware: MiddlewareInputPort) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    await Promise.resolve(
      middleware.handleRequest({
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers,
        method: request.method
      })
        .then(() => { next() })
        .catch((error: ApplicationErrorModel) => {
          next(error)
        })
    )
  }
}
