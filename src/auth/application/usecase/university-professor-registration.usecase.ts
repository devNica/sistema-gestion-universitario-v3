import { type CreateProfessorUserOP, type FetchRolByNameOP } from '@auth/domain/ports/output/auth-repository.output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import constants from '@core/shared/constants'
import { getInitialPasswordExpirationTime } from '@core/shared/utils/create-future-date'
import { generateRandomSeries } from '@core/shared/utils/generate-random-serie'
import { generateUsername, sanitizeInputStrings } from '@core/shared/utils/generate-username'
import { type UniversityProfessorRegistrationUsecaseIP } from '@auth/domain/ports/input/auth-usecase.input.port'
import { type UniversityProfessorRegistrationIC } from '@auth/domain/models/controllers/controller-input.model'
import { type UniversityProfessorRegistrationOC } from '@auth/domain/models/controllers/controller-output.model'

export default class UniversityProfessorRegistrationUsecase implements UniversityProfessorRegistrationUsecaseIP {
  constructor (
    private readonly authPort: CreateProfessorUserOP,
    private readonly rolPort: FetchRolByNameOP,
    private readonly encryptor: PasswordEncryptorOutputPort
  ) { }

  async register (request: UniversityProfessorRegistrationIC): Promise<UniversityProfessorRegistrationOC> {
    const santizeFirstname = sanitizeInputStrings(request.firstname)
    const sanitizeLastname = sanitizeInputStrings(request.lastname)

    const username = generateUsername(santizeFirstname, sanitizeLastname) + generateRandomSeries(3, constants.CHAR_MINOR)

    const rol = await this.rolPort.fetchRol('docente')

    await this.authPort.createProfessorUser({
      firstname: request.firstname,
      lastname: request.lastname,
      personalEmail: request.personalEmail,
      passwordHashed: await this.encryptor.passwordEncrypt(request.password),
      username,
      rolId: rol.id,
      expiresIn: getInitialPasswordExpirationTime()
    })

    return {
      username
    }
  }
}
