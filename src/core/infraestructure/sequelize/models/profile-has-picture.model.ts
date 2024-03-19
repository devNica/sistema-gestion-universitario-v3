import { type ProfileHasPictureDB } from '@core/domain/entities/FileEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model } from 'sequelize'

export default class ProfileHasPictureModel extends Model<ProfileHasPictureDB> implements ProfileHasPictureDB {
  declare infoId: UUID
  declare fileId: UUID
}

ProfileHasPictureModel.init({
  infoId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'personal_info',
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
  modelName: 'profile_has_picture'
})
