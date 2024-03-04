import { type CourseEntity, type OrganizationalUnitEntity } from '@core/models/entities/organization-unit.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface OrgUnitInputModel extends Optional<OrganizationalUnitEntity, 'id' | 'createdAt' | 'updatedAt' | 'Courses'> { }

export default class OrgUnitModel extends Model<OrganizationalUnitEntity, OrgUnitInputModel> implements OrganizationalUnitEntity {
  declare id: UUID

  declare unitName: string
  declare reference: string
  declare createdAt: Date
  declare updatedAt: Date
  Courses?: CourseEntity[]
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
