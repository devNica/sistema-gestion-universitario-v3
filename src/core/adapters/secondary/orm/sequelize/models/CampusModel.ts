import { type CampusEntity } from '@core/models/entities/organization-unit.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, type Optional } from 'sequelize'

interface CampusInputModel extends Optional<CampusEntity, 'id'> { }

export default class CampusModel extends Model<CampusEntity, CampusInputModel> implements CampusEntity {
  declare id: UUID
  declare referenceName: string
  declare address: string
  declare email: string
  declare phones: string
}

CampusModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  referenceName: {
    type: DataTypes.STRING,
    allowNull: false
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
