import express, { type Application } from 'express'
import http from 'http'
import cors from 'cors'

const appExpress: Application = express()
const server = http.createServer(appExpress.use(cors({ origin: '*' })))

export {
  appExpress,
  server
}
