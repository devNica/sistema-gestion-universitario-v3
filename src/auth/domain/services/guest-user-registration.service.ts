import { generateUsername } from '@core/shared/utils/generate-username'
import { sanitizeInputStrings } from '@core/shared/utils/sanitize-input-string'
import { type GuestRegistrationApplicationModel, type RegisteredAccountApplicationModel } from '../ports/application/application-domain.model'
import { type GuestUserRegistrationPort } from '../ports/application/application-domain.port'
import { type RolRepositoryPort, type CreateUserPort } from '../ports/repository/repository-domain.port'
import { generateRandomSeries } from '@core/shared/utils/generate-random-series'
import { type PasswordProtectionServiceOutputPort } from '@core/domain/ports/security/password-protection-service.port'
import { getInitialPasswordExpirationTime } from '@core/shared/utils/create-future-date'
import constants from '@core/shared/constants'
import { type RolEntity } from '../entities/AuthEntity'

export default class GuestUserRegistrationDomainService implements GuestUserRegistrationPort {
  constructor (
    private readonly userAccountRepo: CreateUserPort,
    private readonly rolRepo: RolRepositoryPort<RolEntity>,
    private readonly encryptor: PasswordProtectionServiceOutputPort
  ) {}

  async register (data: GuestRegistrationApplicationModel): Promise<RegisteredAccountApplicationModel> {
    let password = generateRandomSeries(10, constants.CHAR_MAYOR) + generateRandomSeries(1, constants.CHAR_SPEC)
    password = password.replace(/^\w/, c => c.toUpperCase())

    const santizeFirstname = sanitizeInputStrings(data.firstname)
    const sanitizeLastname = sanitizeInputStrings(data.lastname)

    const username = generateUsername(santizeFirstname, sanitizeLastname) + generateRandomSeries(3, constants.CHAR_MINOR)

    const rol = await this.rolRepo.fetch({ rol: 'invitado' })

    await this.userAccountRepo.createGuest({
      firstname: santizeFirstname,
      lastname: sanitizeLastname,
      dni: data.dni,
      address: data.address,
      phoneNumber: data.phoneNumber,
      personalEmail: data.personalEmail,
      birthdate: data.birthdate,
      nationality: data.nationality,
      passwordHashed: await this.encryptor.passwordEncrypt(password),
      username,
      rolId: rol.rolId,
      expiresIn: getInitialPasswordExpirationTime(),
      requiresAdmission: true
    })

    return {
      username,
      password
    }
  }
}
