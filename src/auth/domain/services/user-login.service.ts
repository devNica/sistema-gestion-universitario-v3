/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type PasswordProtectionServiceOutputPort } from '@core/domain/ports/security/password-protection-service.port'
import { type UserLoginApplicationModel, type LoggedUserModel } from '../ports/application/application-domain.model'
import { type UserLoginPort } from '../ports/application/application-domain.port'
import { type TokenServiceOutputPort } from '@core/domain/ports/security/token-service.port'
import { type CacheServiceOutputPort } from '@core/domain/ports/cache/cache-service.port'
import { type StoreTokenModel } from '@core/domain/models/token/token.model'
import { type UserRepositoryPort } from '../ports/repository/repository-domain.port'
import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { checkExpirationDate } from '@core/shared/utils/create-future-date'
import { type UserEntity } from '../entities/AuthEntity'

export default class UserLoginDomainService implements UserLoginPort {
  constructor (
    private readonly repository: UserRepositoryPort<UserEntity>,
    private readonly encryptor: PasswordProtectionServiceOutputPort,
    private readonly tokenService: TokenServiceOutputPort,
    private readonly cacheService: CacheServiceOutputPort<StoreTokenModel>
  ) {}

  private async storeRefreshToken (token: string, userId: string): Promise<void> {
    try {
      // recuperar tokens almacenados
      const cacheTokens = await this.cacheService.getStoreByName('refreshtokens')
      // remover el token personal para almacenar uno nuevo
      const privatedToken = cacheTokens.filter(t => t.userId !== userId)

      await this.cacheService.updateStoreByName('refreshtokens', [...privatedToken,
        { userId, token, createdAt: Date.now() }
      ])
    } catch (error) {
      throw new ServiceValidationErrorPresenter('internalServerErrorRequest', String(error))
    }
  }

  async login (data: UserLoginApplicationModel): Promise<LoggedUserModel> {
    const userFound = await this.repository.fetch({ username: data.username })

    if (!userFound?.rolId || !userFound.personalInfo) {
      throw new ServiceValidationErrorPresenter('internalServerErrorRequest', 'Informacion inconsistente')
    }

    const verifyPassword = await this.encryptor.validatePassword(userFound.passwordHashed, data.password)

    if (!verifyPassword) {
      throw new ServiceValidationErrorPresenter('unAuthorizedRequest', 'Crendenciales Incorrectas')
    }

    if (!checkExpirationDate(userFound.expiresIn)) {
      throw new ServiceValidationErrorPresenter('temporaryRedirect', 'Contraseña Expirada')
    }

    const sessionToken = this.tokenService.signAccessToken({ userId: userFound.userId, rol: userFound.rolId })
    const refreshToken = this.tokenService.signRefreshToken({ userId: userFound.userId, rol: userFound.rolId })

    await this.storeRefreshToken(refreshToken.token, userFound.userId)

    const { firstname, lastname } = userFound.personalInfo

    return {
      nameAcronyms: firstname.charAt(0) + lastname.charAt(0),
      firstname,
      lastname,
      token: sessionToken.token
    }
  }
}
