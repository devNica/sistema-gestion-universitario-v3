import { type CourseDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface CourseInputModel extends Optional<CourseDB, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> { }

export default class CourseModel extends Model<CourseDB, CourseInputModel> implements CourseDB {
  declare id: UUID
  declare courseName: string
  declare reference: string
  declare isActive: boolean
  declare createdAt: Date
  declare updatedAt: Date
  declare unitId: UUID
}

CourseModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  courseName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  reference: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
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
  unitId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'organizational_unit',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'course',
  underscored: true
})
