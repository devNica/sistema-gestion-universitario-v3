import { type Router } from 'express'

export interface ControllerModel {
  path: string
  controller: Router
}

export type EmptyResponseModel = Record<string, unknown>

export type EmptyRequestModel = Record<string, unknown>
