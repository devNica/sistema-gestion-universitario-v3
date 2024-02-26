import { type UUID } from '@core/models/generic/custom-types.model'

export interface RegisterInitAccuOP {
  registerInitAccu: (initAccu: number, applicantId: UUID) => Promise<void>
}
