import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type PromoteAccountModel } from '../ports/application/application-domain.model'
import { type PromoteAccountPort } from '../ports/application/application-domain.port'
import { type UserRepositoryPort, type RolRepositoryPort, type UserSpecificationPort } from '../ports/repository/repository-domain.port'
import { type RolEntity, type UserEntity } from '../entities/AuthEntity'

export default class PromoteGuestUserToStudentDomainService implements PromoteAccountPort {
  constructor (
    private readonly portA: UserRepositoryPort<UserEntity>,
    private readonly portB: UserSpecificationPort<UserEntity>,
    private readonly portC: RolRepositoryPort<RolEntity>
  ) {}

  async promote (data: PromoteAccountModel): Promise<EmptyResponseModel> {
    /** verificar rol actual del usuario */
    const verify = await this.portB.isGuestUser({
      userId: data.userId
    })

    /** si el rol no es invitado no se autoriza la promocion de la cuenta */
    if (!verify) throw new ServiceValidationErrorPresenter('unAuthorizedRequest', 'El rol actual incorrecto!')

    /** se recupera el objeto rol asociado a un rol especificado */
    const rol = await this.portC.fetch({ rol: 'estudiante' })

    /** actualizar el rol del usuario */
    await this.portA.upgrade({
      userId: data.userId,
      rolInfo: {
        rolId: rol.rolId
      }
    })

    return {}
  }
}
