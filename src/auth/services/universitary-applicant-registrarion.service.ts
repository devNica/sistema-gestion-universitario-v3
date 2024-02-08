import { type UniversitaryApplicantRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UniversitaryApplicantRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type CreateGuestUserOP, type FetchRolByNameOP } from '@auth/ports/output/auth-repository.output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import constants from '@core/shared/constants'
import { generateRandomSeries } from '@core/shared/utils/generate-random-serie'
import { generateUsername, sanitizeInputStrings } from '@core/shared/utils/generate-username'

export interface UniversitaryApplicantRegistrationSrvI {
  register: (request: UniversitaryApplicantRegistrationIC) => Promise<UniversitaryApplicantRegistrationOC>
}

export default class UniversitaryApplicantRegistrarionService implements UniversitaryApplicantRegistrationSrvI {
  constructor (
    private readonly authPort: CreateGuestUserOP,
    private readonly rolPort: FetchRolByNameOP,
    private readonly encryptor: PasswordEncryptorOutputPort
  ) {}

  async register (request: UniversitaryApplicantRegistrationIC): Promise<UniversitaryApplicantRegistrationOC> {
    const password = generateRandomSeries(10, constants.CHAR_MAYOR) + generateRandomSeries(1, constants.CHAR_SPEC)

    const santizeFirstname = sanitizeInputStrings(request.firstname)
    const sanitizeLastname = sanitizeInputStrings(request.lastname)

    const username = generateUsername(santizeFirstname, sanitizeLastname) + generateRandomSeries(3, constants.CHAR_MINOR)

    const rol = await this.rolPort.fetchRol('invitado')

    await this.authPort.createGuestUser({
      firstname: request.firstname,
      lastname: request.lastname,
      dni: request.dni,
      address: request.address,
      phoneNumber: request.phoneNumber,
      personalEmail: request.personalEmail,
      birthdate: request.birthdate,
      nationality: request.nationality,
      passwordHashed: await this.encryptor.passwordEncrypt(password),
      username,
      rolId: rol.id
    })

    return {
      username,
      password
    }
  }
}
