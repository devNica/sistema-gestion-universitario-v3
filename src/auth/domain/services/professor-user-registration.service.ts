import { getInitialPasswordExpirationTime } from '@core/shared/utils/create-future-date'
import { generateRandomSeries } from '@core/shared/utils/generate-random-series'
import { generateUsername } from '@core/shared/utils/generate-username'
import { sanitizeInputStrings } from '@core/shared/utils/sanitize-input-string'
import { type ProfessorRegistrationApplicationModel, type RegisteredAccountApplicationModel } from '../ports/application/application-domain.model'
import { type ProfesorUserRegistrationPort } from '../ports/application/application-domain.port'
import { type CreateUserPort, type RolRepositoryPort } from '../ports/repository/repository-domain.port'
import { type PasswordProtectionServiceOutputPort } from '@core/domain/ports/security/password-protection-service.port'
import constants from '@core/shared/constants'
import { type RolEntity } from '../entities/AuthEntity'

export default class ProfessorUserRegistrationDomainService implements ProfesorUserRegistrationPort {
  constructor (
    private readonly userAccountRepo: CreateUserPort,
    private readonly rolRepo: RolRepositoryPort<RolEntity>,
    private readonly encryptor: PasswordProtectionServiceOutputPort
  ) {}

  async register (data: ProfessorRegistrationApplicationModel): Promise<RegisteredAccountApplicationModel> {
    const santizeFirstname = sanitizeInputStrings(data.firstname)
    const sanitizeLastname = sanitizeInputStrings(data.lastname)

    const username = generateUsername(santizeFirstname, sanitizeLastname) + generateRandomSeries(3, constants.CHAR_MINOR)

    const rol = await this.rolRepo.fetch({ rol: 'docente' })

    await this.userAccountRepo.createProfessor({
      firstname: data.firstname,
      lastname: data.lastname,
      personalEmail: data.personalEmail,
      passwordHashed: await this.encryptor.passwordEncrypt(data.password),
      username,
      rolId: rol.rolId,
      expiresIn: getInitialPasswordExpirationTime()
    })

    return {
      username
    }
  }
}
