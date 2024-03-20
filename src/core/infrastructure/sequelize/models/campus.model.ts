import { type CampusDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, type Optional } from 'sequelize'

interface CampusInputModel extends Optional<CampusDB, 'id'> { }

export default class CampusModel extends Model<CampusDB, CampusInputModel> implements CampusDB {
  declare id: UUID
  declare campusName: string
  declare address: string
  declare email: string
  declare phones: Array<{ tel: string }>
}

CampusModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  campusName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phones: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'campus',
  underscored: true
})
