import { type RolEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, type Optional } from 'sequelize'

interface RolInputModel extends Optional<RolEntity, 'id' | 'rol'> { }

export default class RolModel extends Model<RolEntity, RolInputModel> implements RolEntity {
  id: UUID
  rol: string
  users?: Pick<UserAccountEntity, 'id' | 'email' | 'state'> | undefined
}

RolModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'rol'
})
