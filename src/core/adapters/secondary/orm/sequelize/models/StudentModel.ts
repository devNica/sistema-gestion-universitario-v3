import { type ProfileInfoEntity } from '@core/models/entities/auth.entity'
import { type StudentEntity } from '@core/models/entities/student.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface StudentInputModel extends Optional<StudentEntity, 'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'finishedAcademicPlan'> { }

export default class StudentModel extends Model<StudentEntity, StudentInputModel> implements StudentEntity {
  declare id: UUID
  declare studentNumber: string
  declare finishedAcademicPlan: boolean
  declare courseProgramId: UUID
  declare campusId: UUID
  declare profileId: UUID
  declare enrollmentTypeId: UUID
  declare createdAt: Date
  declare updatedAt: Date
  declare isActive: boolean
  profile?: Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'dni' | 'requiresAdmission'> | undefined
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
  profileId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'profile_info',
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
