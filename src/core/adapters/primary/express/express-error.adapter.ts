import { type NextFunction, type Request, type Response } from 'express'
import { DefaultApplicationErrorAdapter } from '../errors/default-application-error.adapter'

export function expressAsyncErrorAdapter
(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (!(error instanceof DefaultApplicationErrorAdapter)) {
    res.status(500).json({
      data: {
        errorName: error.name,
        messages: ['Something went wrong']
      },
      message: 'Something went wrong'
    })
  } else if (error instanceof DefaultApplicationErrorAdapter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name,
          messages: error.messages
        }
      })
  }
}
