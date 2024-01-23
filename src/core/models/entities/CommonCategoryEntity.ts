export interface CommonCategoryEntity {
  id: string
  category: string
  parentRef: string
  hasChildrens: boolean
  flow: number
  createdAt: string
  updatedAt: string
  isActive: boolean
}
