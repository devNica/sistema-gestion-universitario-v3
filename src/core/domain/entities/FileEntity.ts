export interface UserHasPictureDB {
  userId: string
  fileId: string
}

export interface FileDB {
  filename: string
  filetype: string
  filesize: number
  binary: Buffer
}
