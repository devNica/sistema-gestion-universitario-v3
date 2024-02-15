import { type MiddlewareRequestModel } from '@core/models/middleware/middleware-request.model'
import { type MiddlewareInputPort } from '@core/ports/input/middleware-input.port'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import ServiceValidationErrorPresenter from '../presenters/service-validation-error.presenter'
import { type AuthenticationRolModel } from '@core/models/generic/auth.model'

export class IsAuthenticatedMiddlewareAdapter implements MiddlewareInputPort<void> {
  constructor (private readonly tokenService: JWTOutputPort, private readonly rol: AuthenticationRolModel) { }

  async handleRequest (request: MiddlewareRequestModel): Promise<void> {
    if (
      !objectKeyExists(request, 'headers') ||
      !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new ServiceValidationErrorPresenter('Peticion Invalida', 'badRequest')
    }

    const { authorization }: { authorization: string } = request.headers
    let [, token] = authorization.split(/\s+/)

    if (typeof token === 'undefined') token = ''
    else if (typeof token !== 'string') throw new ServiceValidationErrorPresenter('Token invalido', 'forbiddenRequest')

    try {
      const result = this.tokenService.verify(token, true)

      if (result.rol !== this.rol) { throw new ServiceValidationErrorPresenter('Rol invalido') }
    } catch (error) {
      if (error instanceof ServiceValidationErrorPresenter) {
        throw new ServiceValidationErrorPresenter(error.message, 'forbiddenRequest')
      } else {
        throw new ServiceValidationErrorPresenter('Token expirado', 'unAuthorizedRequest')
      }
    }
  }
}
