export type HttpStatusResponseType =
    'successRequest' | 'createdRequest' | 'unAuthorizedRequest' |
    'forbiddenRequest' | 'badRequest' | 'internalServerErrorRequest' |
    'notFoundRequest' | 'payloadTooLargeRequest' | 'unprocessableEntityRequest' |
    'temporaryRedirect'

export const HttpStatusRecord: Record<HttpStatusResponseType, number> = {
  successRequest: 200,
  createdRequest: 201,
  unAuthorizedRequest: 401,
  forbiddenRequest: 403,
  badRequest: 400,
  internalServerErrorRequest: 500,
  notFoundRequest: 404,
  payloadTooLargeRequest: 413,
  unprocessableEntityRequest: 422,
  temporaryRedirect: 307
}

export interface HttpResponseModel<T> {
  meta: T
  message: string
  statusCode: number
}
