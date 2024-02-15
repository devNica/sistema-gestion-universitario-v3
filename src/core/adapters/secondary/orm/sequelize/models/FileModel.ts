import { type FileEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, type Optional } from 'sequelize'

interface FileInputModel extends Optional<FileEntity, 'filesize' | 'filetype' | 'binary'> { }

export default class FileModel extends Model<FileEntity, FileInputModel> implements FileEntity {
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
