import { type PersonalInfoDB } from '@core/domain/entities/AuthEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, type Optional } from 'sequelize'

interface PersonalInfoInputModel extends Optional<PersonalInfoDB, 'id' | 'address' | 'dni' | 'phoneNumber' | 'nationality' | 'birthdate'> { }

export default class PersonalInfoModel extends Model<PersonalInfoDB, PersonalInfoInputModel> implements PersonalInfoDB {
  declare id: string | UUID
  declare firstname: string
  declare lastname: string
  declare birthdate: string
  declare dni: string
  declare phoneNumber: string
  declare nationality: string
  declare address: string
  declare personalEmail: string
  declare requiresAdmission: boolean
}

PersonalInfoModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  personalEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  requiresAdmission: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'personal_info'
})
