import UpgradeGuestUserToStudentController from '@auth/controllers/upgrade-guest-user-to-student.controller'
import UpgradeGuestUserToStudentService from '@auth/services/upgrade-guest-user-to-student.service'
import SuccessFulUpdatedPresenter from '@core/adapters/primary/presenters/successful-update.presenter'
import { fetchRolByNameRepo, promoteUserAccountRepo, verifyUserRoleRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'

function factory (): ControllerInputPort {
  const service = new UpgradeGuestUserToStudentService(
    promoteUserAccountRepo,
    verifyUserRoleRepo,
    fetchRolByNameRepo
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const controller = new UpgradeGuestUserToStudentController(
    service,
    presenter
  )

  return controller
}

export const upgradeGuestUserToStudentFactory = factory()
