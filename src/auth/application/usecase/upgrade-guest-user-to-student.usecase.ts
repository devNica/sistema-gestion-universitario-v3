import { type VerifyUserRoleOP, type FetchRolByNameOP, type PromoteUserAccountOP } from '@auth/domain/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type UpgradeGuestUserToStudentUsecaseIP } from '@auth/domain/ports/input/auth-usecase.input.port'
import { type UpgradeGuestUserAccountToStudentIC } from '@auth/domain/models/controllers/controller-input.model'

export default class UpgradeGuestUserToStudentUsecase implements UpgradeGuestUserToStudentUsecaseIP {
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
