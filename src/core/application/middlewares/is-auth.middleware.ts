import { type AuthenticationRolModel } from '@core/domain/models/api/auth.model'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'
import { type MiddlewareRequestModel } from '../models/middlewares/middleware.model'
import { type MiddlewareInputPort } from '../ports/middleware-input.port'
import ServiceValidationErrorPresenter from '../presenter/service-validation-error.presenter'
import { type TokenServiceOutputPort } from '@core/domain/ports/security/token-service.port'

export class IsAuthenticatedMiddlewareAdapter implements MiddlewareInputPort<void> {
  constructor (private readonly tokenService: TokenServiceOutputPort, private readonly rol: AuthenticationRolModel) { }

  async handleRequest (request: MiddlewareRequestModel): Promise<void> {
    if (
      !objectKeyExists(request, 'headers') ||
        !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new ServiceValidationErrorPresenter('badRequest', 'Peticion Invalida')
    }

    const { authorization }: { authorization: string } = request.headers
    let [, token] = authorization.split(/\s+/)

    if (typeof token === 'undefined') token = ''
    else if (typeof token !== 'string') throw new ServiceValidationErrorPresenter('forbiddenRequest', 'Token Invalido')

    try {
      const result = this.tokenService.verify(token, true)

      if (result.rol !== this.rol) { throw new ServiceValidationErrorPresenter('unAuthorizedRequest', 'Rol Invalido') }
    } catch (error) {
      if (error instanceof ServiceValidationErrorPresenter) {
        throw new ServiceValidationErrorPresenter('forbiddenRequest', error.message)
      } else {
        throw new ServiceValidationErrorPresenter('unAuthorizedRequest', 'Token Expirado')
      }
    }
  }
}
