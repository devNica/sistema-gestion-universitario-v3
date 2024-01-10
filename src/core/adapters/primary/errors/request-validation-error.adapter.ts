import { HttpStatusRecord } from '@core/models/http/http-response.model'
import { DefaultApplicationErrorAdapter } from './default-application-error.adapter'

export class RequestValidationErrorAdapter extends DefaultApplicationErrorAdapter {
  name = 'Invalid Request'
  statusCode = HttpStatusRecord.badRequest
}
