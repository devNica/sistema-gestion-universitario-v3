import { Router } from 'express'
import campusRouter from './campus.router'
import knowledgeAreaRouter from './knowledarea.router'
import courseRouter from './course.router'

const backofficeRouter = Router()

backofficeRouter.use('/campus', campusRouter)
backofficeRouter.use('/knowledge-area', knowledgeAreaRouter)
backofficeRouter.use('/course', courseRouter)

export default backofficeRouter
