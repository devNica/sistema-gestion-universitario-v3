import { type AdmissionDB } from '@core/domain/entities/AdmissionEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface AdmissionInputModel extends Optional<AdmissionDB, 'id' | 'evalGrade' | 'finalGrade' | 'approved' | 'createdAt' | 'updatedAt' | 'evaluatorId'> { }

export default class AdmissionModel extends Model<AdmissionDB, AdmissionInputModel> implements AdmissionDB {
  declare id: UUID
  declare initAccu: number
  declare evalGrade: number
  declare finalGrade: number
  declare approved: boolean
  declare createdAt: Date
  declare updatedAt: Date
  declare applicantId: UUID
  declare evaluatorId: UUID
}

AdmissionModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  initAccu: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false
  },
  evalGrade: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  finalGrade: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  applicantId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'personal_info',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'

  },
  evaluatorId: {
    type: DataTypes.STRING(36),
    allowNull: true
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'admission'
})
