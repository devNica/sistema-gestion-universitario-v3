import { type ApplicationErrorOutputPort } from '@core/application/ports/application-error-output.port'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type Request, type Response, type NextFunction } from 'express'

export function expressRouteAdapter<T> (controller: ControllerInputPort<T>) {
  return async (request: Request, response: Response, next: NextFunction) => {
    await Promise.resolve(controller.handleRequest({
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    })).then(ctrl => {
      response.status(ctrl.statusCode).json({ data: ctrl.meta, message: ctrl.message })
      next()
    }).catch((error: ApplicationErrorOutputPort) => {
      next(error)
    })
  }
}
