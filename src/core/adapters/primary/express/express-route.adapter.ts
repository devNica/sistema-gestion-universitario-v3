import { type ApplicationErrorModel } from '@core/models/errors/application-error.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type NextFunction, type Request, type Response } from 'express'

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
    }).catch((error: ApplicationErrorModel) => {
      next(error)
    })
  }
}