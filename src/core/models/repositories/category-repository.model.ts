import { type CommonCategoryEntity } from '../entities/CommonCategoryEntity'

export type CommonCategoryRegisterModel = Pick<CommonCategoryEntity, 'category' | 'hasChildrens' | 'flow'> & {
  parentRef?: string
}
