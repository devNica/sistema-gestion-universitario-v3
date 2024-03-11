import { promoteUserAccountRepo, verifyUserRoleRepo, fetchRolByNameRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import UpgradeGuestUserToStudentController from '@auth/interface/adapters/primary/controllers/upgrade-guest-user-to-student.controller'
import UpgradeGuestUserToStudentUsecase from '@auth/application/usecase/upgrade-guest-user-to-student.usecase'
import SuccessFulUpdatedPresenter from '@core/adapters/primary/presenters/successful-update.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'

function factory (): ControllerInputPort {
  const usecase = new UpgradeGuestUserToStudentUsecase(
    promoteUserAccountRepo,
    verifyUserRoleRepo,
    fetchRolByNameRepo
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const controller = new UpgradeGuestUserToStudentController(
    usecase,
    presenter
  )

  return controller
}

export const upgradeGuestUserToStudentFactory = factory()
