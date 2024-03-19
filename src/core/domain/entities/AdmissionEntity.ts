export interface AdmissionDB {
  id: string
  initAccu: number
  evalGrade: number
  finalGrade: number
  approved: boolean
  createdAt: Date
  updatedAt: Date
  applicantId: string
  evaluatorId: string
}
