import { type FileDB } from '@core/domain/entities/FileEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, type Optional } from 'sequelize'

interface FileInputModel extends Optional<FileDB, 'filesize' | 'filetype' | 'binary'> { }

export default class FileModel extends Model<FileDB, FileInputModel> implements FileDB {
  declare filename: UUID
  declare filetype: string
  declare filesize: number
  declare binary: Buffer
}

FileModel.init({
  filename: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  filetype: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  filesize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  binary: {
    type: DataTypes.BLOB(),
    allowNull: false
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'file'
})
