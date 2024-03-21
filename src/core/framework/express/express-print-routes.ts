/* eslint-disable @typescript-eslint/no-var-requires */
import { type Application, type NextFunction, type Request, type Response } from 'express'
const listEndpoints = require('express-list-endpoints')

export async function expressPrintRoutes (app: Application, allow: boolean): Promise<void> {
  if (allow) {
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      console.log('Rutas registradas:')
      console.log(listEndpoints(app))
      next()
    })
  }
}
