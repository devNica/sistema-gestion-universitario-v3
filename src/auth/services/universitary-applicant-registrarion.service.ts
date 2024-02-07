import { type UniversitaryApplicantRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UniversitaryApplicantRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type CreateUserAccountOP, type FetchRolByNameOP } from '@auth/ports/output/auth-repository.output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import constants from '@core/shared/constants'
import { generateRandomSeries } from '@core/shared/utils/generate-random-serie'
import { generateUsername } from '@core/shared/utils/generate-username'

export interface UniversitaryApplicantRegistrationSrvI {
  register: (request: UniversitaryApplicantRegistrationIC) => Promise<UniversitaryApplicantRegistrationOC>
}

export default class UniversitaryApplicantRegistrarionService implements UniversitaryApplicantRegistrationSrvI {
  constructor (
    private readonly authPort: CreateUserAccountOP,
    private readonly rolPort: FetchRolByNameOP,
    private readonly encryptor: PasswordEncryptorOutputPort
  ) {}

  async register (request: UniversitaryApplicantRegistrationIC): Promise<UniversitaryApplicantRegistrationOC> {
    const password = generateRandomSeries(10, constants.CHAR_MAYOR)

    const username = generateUsername(request.firstname, request.lastname) + generateRandomSeries(3, constants.CHAR_MINOR)

    const rol = await this.rolPort.fetchRol('invitado')

    await this.authPort.create({
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
