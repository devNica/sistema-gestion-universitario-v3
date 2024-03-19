import PromoteGuestUserToStudenUseCase from '@auth/application/usecase/promote-guest-user-to-student.usecase'
import PromoteGuestUserToStudentDomainService from '@auth/domain/services/promote-guest-user-to-student.service'
import { userRepository, userSpecRepository } from '@auth/infraestructure/repositories/auth-repository.adapter'
import { rolRepository } from '@auth/infraestructure/repositories/rol-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessFulUpdatedPresenter from '@core/application/presenter/successful-update.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'

function factory (): ControllerInputPort {
  const service = new PromoteGuestUserToStudentDomainService(
    userRepository,
    userSpecRepository,
    rolRepository
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const usecase = new PromoteGuestUserToStudenUseCase(
    service,
    presenter
  )

  return usecase
}

export const promoteGuestUserToStudentFactory = factory()
