import { type CommonCategoryRegisterModel } from '@core/models/repositories/category-repository.model'

export interface InsertCommonProductCategoryI {
  create: (data: CommonCategoryRegisterModel) => Promise<void | never>
}
