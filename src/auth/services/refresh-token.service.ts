import { type RefreshTokenIC } from '@auth/models/controllers/controller-input.model'
import { type RefreshTokenOC } from '@auth/models/controllers/controller-output.model'
import { type FetchUserAccountByParamsOP } from '@auth/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type UUID } from '@core/models/generic/custom-types.model'
import { type StoreTokenModel } from '@core/models/token/token.model'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import { type CacheOutputPort } from '@core/ports/output/service/cache-output.port'
import { checkExpirationDate } from '@core/shared/utils/create-future-date'

export interface RefreshTokenSrvI {
  refreshToken: (request: RefreshTokenIC) => Promise<RefreshTokenOC>
}

export default class RefreshTokenService implements RefreshTokenSrvI {
  constructor (
    private readonly userPort: FetchUserAccountByParamsOP,
    private readonly tokenService: JWTOutputPort,
    private readonly cacheService: CacheOutputPort<StoreTokenModel>
  ) { }

  private async validateCurrentRefresToken (userId: UUID): Promise<void> {
    try {
      // recuperar tokens almancenado
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')

      // filtrar para recuperar el token del usuario
      const personalToken = cacheTokens.filter(t => t.userId === userId)

      this.tokenService.verify(personalToken[0].token)
    } catch (error: unknown) {
      console.log(error)
      throw new ServiceValidationErrorPresenter('Token de Recuperacion Expirados', 'forbiddenRequest')
    }
  }

  private async storeRefreshToken (token: string, userId: UUID): Promise<void> {
    try {
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')

      const privatedToken = cacheTokens.filter(t => t.userId !== userId)
      await this.cacheService.updateStoreByName('refreshtokens', [...privatedToken,
        { userId, token, createdAt: Date.now() }
      ])
    } catch (error) {
      throw new ServiceValidationErrorPresenter(String(error))
    }
  }

  async refreshToken (request: RefreshTokenIC): Promise<RefreshTokenOC> {
    const userFound = await this.userPort.fetchAccount({ userId: request.userId })

    // validate password expires
    if (!checkExpirationDate(userFound.expiresIn)) {
      throw new ServiceValidationErrorPresenter('Contraseña Expirada', 'temporaryRedirect')
    }

    // validate refresh token
    await this.validateCurrentRefresToken(userFound.id)

    // generate new tokens
    const sessionToken = this.tokenService.signAccessToken({ id: userFound.id, rol: userFound.rol })
    const refreshToken = this.tokenService.signRefreshToken({ id: userFound.id, rol: userFound.rol })

    await this.storeRefreshToken(refreshToken.token, userFound.id)

    return {
      token: sessionToken.token
    }
  }
}
