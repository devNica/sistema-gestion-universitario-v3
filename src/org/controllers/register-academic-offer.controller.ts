import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type UUID } from '@core/models/generic/custom-types.model'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type AcademicOfferIC } from '@org/models/controllers/controller-input.model'
import { type RegisterAcademicOfferSrvI } from '@org/services/register-academica-offer.service'

export class RegisterAcademicOfferController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: RegisterAcademicOfferSrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<AcademicOfferIC, { id: UUID }>): Promise<HttpResponseModel<EmptyResponseModel | never>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Error in request params')
    }

    await this.service.registerAcademicOffer({ ...request.body, campusId: request.params.id })

    return await this.presenter.handleResponse({}, 'Registro de oferta academica satisfactoria')
  }
}
