import { type UserHasRoleEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model } from 'sequelize'

export default class UserHasRoleModel extends Model<UserHasRoleEntity> implements UserHasRoleEntity {
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
