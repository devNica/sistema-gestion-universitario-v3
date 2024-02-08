import { type UniversityProfessorRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UniversityProfessorRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type CreateProfessorUserOP, type FetchRolByNameOP } from '@auth/ports/output/auth-repository.output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import constants from '@core/shared/constants'
import { generateRandomSeries } from '@core/shared/utils/generate-random-serie'
import { generateUsername, sanitizeInputStrings } from '@core/shared/utils/generate-username'

export interface UniversityProfessorRegistrationSrvI {
  register: (request: UniversityProfessorRegistrationIC) => Promise<UniversityProfessorRegistrationOC>
}

export default class UniversityProfessorRegistrationService implements UniversityProfessorRegistrationSrvI {
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
      rolId: rol.id
    })

    return {
      username
    }
  }
}
