import { type EnrollmentTypeDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface EnrollmentTypeInputModel extends Optional<EnrollmentTypeDB, 'id'> { }

export default class EnrollmentTypeModel extends Model<EnrollmentTypeDB, EnrollmentTypeInputModel> implements EnrollmentTypeDB {
  declare id: UUID
  declare enrollment: string
  declare createdAt: Date
  declare updatedAt: Date
  declare isActive: boolean
}

EnrollmentTypeModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  enrollment: {
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
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'enrollment_type',
  underscored: true
})
