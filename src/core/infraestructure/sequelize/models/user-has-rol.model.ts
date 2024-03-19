import { type UserHasRoleDB } from '@core/domain/entities/AuthEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model } from 'sequelize'

export default class UserHasRoleModel extends Model<UserHasRoleDB> implements UserHasRoleDB {
  declare rolId: UUID
  declare userId: UUID
}

UserHasRoleModel.init({
  rolId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'rol',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
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
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'user_has_role'
})
