import { type CourseProgramDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface CourseProgramInputModel extends Optional<CourseProgramDB, 'id' | 'availableForNewEntry' | 'availableForReEntry'
| 'isActive' | 'replaceBy' | 'createdAt' | 'updatedAt' > { }

export default class CourseProgramModel extends Model<CourseProgramDB, CourseProgramInputModel> implements CourseProgramDB {
  declare id: UUID
  declare plan: string
  declare programRef: string
  declare isCurrentPlan: boolean
  declare availableForNewEntry: boolean
  declare availableForReEntry: boolean
  declare replaceBy: UUID
  declare isActive: boolean
  declare courseId: UUID
  declare createdAt: Date
  declare updatedAt: Date
}

CourseProgramModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  plan: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  availableForNewEntry: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  availableForReEntry: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  replaceBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  programRef: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  isCurrentPlan: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  courseId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'course',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW(),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'course_program',
  underscored: true
})
