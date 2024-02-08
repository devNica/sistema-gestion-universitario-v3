import { type UpgradeGuestUserAccountToStudentIC } from '@auth/models/controllers/controller-input.model'
import { type VerifyUserRoleOP, type FetchRolByNameOP, type PromoteUserAccountOP } from '@auth/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'

export interface UpgradeGuestUserToStudentSrvI {
  upgrade: (request: UpgradeGuestUserAccountToStudentIC) => Promise<EmptyResponseModel>
}

export default class UpgradeGuestUserToStudentService implements UpgradeGuestUserToStudentSrvI {
  constructor (
    private readonly portA: PromoteUserAccountOP,
    private readonly portB: VerifyUserRoleOP,
    private readonly portC: FetchRolByNameOP
  ) {}

  async upgrade (request: UpgradeGuestUserAccountToStudentIC): Promise<EmptyResponseModel> {
    const verify = await this.portB.verifyUserRole({
      id: request.id,
      rol: 'invitado'
    })

    if (!verify) throw new ServiceValidationErrorPresenter('El rol actual del usuario no esta permitido')

    const rol = await this.portC.fetchRol('estudiante')

    await this.portA.promoteUser({
      id: request.id,
      rolId: rol.id
    })

    return {}
  }
}
