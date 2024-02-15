import { type UserLoginIC } from '@auth/models/controllers/controller-input.model'
import { type UserLoginOC } from '@auth/models/controllers/controller-output.model'
import { type FetchUserAccountByParamsOP } from '@auth/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type UUID } from '@core/models/generic/custom-types.model'
import { type StoreTokenModel } from '@core/models/token/token.model'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import { type CacheOutputPort } from '@core/ports/output/service/cache-output.port'
import constants from '@core/shared/constants'
import { checkExpirationDate } from '@core/shared/utils/create-future-date'

export interface UserLoginSrvI {
  login: (request: UserLoginIC) => Promise<UserLoginOC>
}

export default class UserLoginService implements UserLoginSrvI {
  constructor (
    private readonly port: FetchUserAccountByParamsOP,
    private readonly encryptor: PasswordEncryptorOutputPort,
    private readonly tokenService: JWTOutputPort,
    private readonly cacheService: CacheOutputPort<StoreTokenModel>
  ) { }

  private async storeRefreshToken (token: string, userId: UUID): Promise<void> {
    try {
      // recuperar tokens almacenados
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')
      // remover el token personal para almacenar uno nuevo
      const privatedToken = cacheTokens.filter(t => t.userId !== userId)

      await this.cacheService.updateStoreByName('refreshtokens', [...privatedToken,
        { userId, token, createdAt: Date.now() }
      ])
    } catch (error) {
      throw new ServiceValidationErrorPresenter(String(error))
    }
  }

  async login (request: UserLoginIC): Promise<UserLoginOC> {
    const userfound = await this.port.fetchAccount({
      username: request.username,
      userId: constants.FAKE_UUID
    })

    const verifyPassword = await this.encryptor.validatePassword(userfound.password, request.password)

    if (!verifyPassword) {
      throw new ServiceValidationErrorPresenter('Crendenciales Incorrectas')
    }

    if (!checkExpirationDate(userfound.expiresIn)) {
      throw new ServiceValidationErrorPresenter('Contraseña Expirada', 'temporaryRedirect')
    }

    const sessionToken = this.tokenService.signAccessToken({ id: userfound.id, rol: userfound.rol })
    const refreshToken = this.tokenService.signRefreshToken({ id: userfound.id, rol: userfound.rol })

    await this.storeRefreshToken(refreshToken.token, userfound.id)

    return {
      nameAcronyms: userfound.firstname.charAt(0) + userfound.lastname.charAt(0),
      firstname: userfound.firstname,
      lastname: userfound.lastname,
      token: sessionToken.token
    }
  }
}
