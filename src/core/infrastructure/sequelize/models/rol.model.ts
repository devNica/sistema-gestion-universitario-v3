import { type RolDB } from '@core/domain/entities/AuthEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, type Optional } from 'sequelize'

interface RolInputModel extends Optional<RolDB, 'id' | 'rol'> { }

export default class RolModel extends Model<RolDB, RolInputModel> implements RolDB {
  declare id: UUID
  declare rol: string
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
