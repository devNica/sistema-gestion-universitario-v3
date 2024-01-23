import { type CommonCategoryRegisterModel } from '@core/models/repositories/category-repository.model'
import { type InsertCommonProductCategoryI } from '@core/ports/output/repositories/category-repository-output.port'
import { CommonCategoryModel } from '../../orm/typeorm/models/CommonProductCategoryModel'
import { QueryFailedError } from 'typeorm'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'

class CategoryRepositoryAdapter implements InsertCommonProductCategoryI {
  async create (data: CommonCategoryRegisterModel): Promise<void> {
    try {
      await CommonCategoryModel.save({
        category: data.category,
        parentRef: data.parentRef ?? '',
        createdAt: new Date().toISOString()
      })
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido en el repositorio de usuarios')
      }
    }
  }
}

const categoryRepoAdapter = new CategoryRepositoryAdapter()
const insertCommonRepo: InsertCommonProductCategoryI = categoryRepoAdapter

export {
  insertCommonRepo
}
