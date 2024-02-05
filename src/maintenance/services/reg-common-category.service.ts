import { type CategoryCtrlInputModel } from '@maintenance/models/controllers/controller.input.model'
import { type InsertCommonProductCategoryI } from '@core/ports/output/repositories/category-repository-output.port'

export interface RegisterCommonCategorySrvI {
  registerCommonCategory: (data: CategoryCtrlInputModel) => Promise<void>
}

export default class RegisterCommonCategoryService implements RegisterCommonCategorySrvI {
  constructor (
    private readonly repository: InsertCommonProductCategoryI
  ) {}

  categoryHasChildren (parentRef?: string): boolean {
    if (parentRef !== null && parentRef !== undefined && parentRef !== '') return true
    else return false
  }

  async registerCommonCategory (data: CategoryCtrlInputModel): Promise<void> {
    await this.repository.create({
      category: data.category,
      parentRef: data.parentRef,
      hasChildrens: this.categoryHasChildren(data.parentRef),
      flow: Number(data.flow)
    })
  }
}
