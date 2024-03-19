import { type StudentDB } from '@core/domain/entities/StudentEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface StudentInputModel extends Optional<StudentDB, 'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'finishedAcademicPlan'> { }

export default class StudentModel extends Model<StudentDB, StudentInputModel> implements StudentDB {
  declare id: UUID
  declare studentNumber: string
  declare finishedAcademicPlan: boolean
  declare courseProgramId: UUID
  declare campusId: UUID
  declare infoId: UUID
  declare enrollmentTypeId: UUID
  declare createdAt: Date
  declare updatedAt: Date
  declare isActive: boolean
}

StudentModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  studentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  finishedAcademicPlan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  campusId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'campus',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    field: 'campus_id'
  },
  courseProgramId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'course_program',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  infoId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'personal_info',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    field: 'profile_id'
  },
  enrollmentTypeId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'enrollment_type',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    field: 'enrollment_type_id'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: NOW(),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'student',
  underscored: true
})
