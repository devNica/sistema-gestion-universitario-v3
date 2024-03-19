import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { type StoreTokenModel } from '@core/domain/models/token/token.model'
import { type CacheServiceOutputPort } from '@core/domain/ports/cache/cache-service.port'
import { type TokenServiceOutputPort } from '@core/domain/ports/security/token-service.port'
import { checkExpirationDate } from '@core/shared/utils/create-future-date'
import { type UserRepositoryPort } from '../ports/repository/repository-domain.port'
import { type UserEntity } from '../entities/AuthEntity'
import { type NewTokenModel, type RefreshTokenModel } from '../ports/application/application-domain.model'
import { type RefreshTokenPort } from '../ports/application/application-domain.port'

export default class RefreshTokenDomainService implements RefreshTokenPort {
  constructor (
    private readonly userPort: UserRepositoryPort<UserEntity>,
    private readonly tokenService: TokenServiceOutputPort,
    private readonly cacheService: CacheServiceOutputPort<StoreTokenModel>
  ) { }

  private async validateCurrentRefresToken (userId: UUID | string): Promise<void> {
    try {
      // recuperar tokens almancenado
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')

      // filtrar para recuperar el token del usuario
      const personalToken = cacheTokens.filter(t => t.userId === userId)

      this.tokenService.verify(personalToken[0].token, false)
    } catch (error: unknown) {
      console.log(error)
      throw new ServiceValidationErrorPresenter('forbiddenRequest', 'Token de Recuperacion Expirados')
    }
  }

  private async storeRefreshToken (token: string, userId: UUID | string): Promise<void> {
    try {
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')

      const privatedToken = cacheTokens.filter(t => t.userId !== userId)
      await this.cacheService.updateStoreByName('refreshtokens', [...privatedToken,
        { userId, token, createdAt: Date.now() }
      ])
    } catch (error) {
      throw new ServiceValidationErrorPresenter('badRequest', String(error))
    }
  }

  async refreshToken (request: RefreshTokenModel): Promise<NewTokenModel> {
    const userFound = await this.userPort.fetch({ userId: request.userId })

    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    if (!userFound?.rolId) { throw new ServiceValidationErrorPresenter('internalServerErrorRequest', 'Error de consulta de informacion') }

    // validate password expires
    if (!checkExpirationDate(userFound.expiresIn)) {
      throw new ServiceValidationErrorPresenter('temporaryRedirect', 'Contraseña Expirada')
    }

    // validate refresh token
    await this.validateCurrentRefresToken(userFound.userId)

    // generate new tokens
    const sessionToken = this.tokenService.signAccessToken({ userId: userFound.userId, rol: userFound.rolId })
    const refreshToken = this.tokenService.signRefreshToken({ userId: userFound.userId, rol: userFound.rolId })

    await this.storeRefreshToken(refreshToken.token, userFound.userId)

    return {
      token: sessionToken.token
    }
  }
}
