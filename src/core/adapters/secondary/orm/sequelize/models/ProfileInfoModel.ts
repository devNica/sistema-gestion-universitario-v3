import { type ProfileInfoEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, type Optional } from 'sequelize'

interface ProfileInfoInputModel extends Optional<ProfileInfoEntity, 'id' | 'address' | 'dni' | 'phoneNumber' | 'nationality' | 'birthdate'> { }

export default class ProfileInfoModel extends Model<ProfileInfoEntity, ProfileInfoInputModel> implements ProfileInfoEntity {
  declare id: UUID
  declare firstname: string
  declare lastname: string
  declare birthdate: string
  declare dni: string
  declare phoneNumber: string
  declare nationality: string
  declare address: string
  declare personalEmail: string
}

ProfileInfoModel.init({
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
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'profile_info'
})
