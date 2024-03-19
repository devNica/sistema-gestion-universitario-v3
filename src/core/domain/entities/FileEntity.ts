import { type UUID } from '../models/customs/custom-types.model'

export interface ProfileHasPictureDB {
  infoId: UUID | string
  fileId: UUID | string
}

export interface FileDB {
  filename: UUID | string
  filetype: string
  filesize: number
  binary: Buffer
}
