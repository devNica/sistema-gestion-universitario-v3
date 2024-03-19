import { type UserHasPictureDB } from '@core/domain/entities/FileEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model } from 'sequelize'

export default class UserHasPictureModel extends Model<UserHasPictureDB> implements UserHasPictureDB {
  declare userId: UUID
  declare fileId: UUID
}

UserHasPictureModel.init({
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'user_account',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  fileId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'file',
      key: 'filename'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'user_has_picture'
})
