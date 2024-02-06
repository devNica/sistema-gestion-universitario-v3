import { type ProfileHasPictureEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model } from 'sequelize'

export default class ProfileHasPictureModel extends Model<ProfileHasPictureEntity> implements ProfileHasPictureEntity {
  profileId: UUID
  fileId: UUID
}

ProfileHasPictureModel.init({
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'profile_info',
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
