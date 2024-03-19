import { type OrganizationalUnitDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface OrgUnitInputModel extends Optional<OrganizationalUnitDB, 'id' | 'createdAt' | 'updatedAt'> { }

export default class OrgUnitModel extends Model<OrganizationalUnitDB, OrgUnitInputModel> implements OrganizationalUnitDB {
  declare id: UUID

  declare unitName: string
  declare reference: string
  declare createdAt: Date
  declare updatedAt: Date
}

OrgUnitModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  unitName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  sequelize: sequelizeInstance,
  modelName: 'organizational_unit',
  underscored: true
})
