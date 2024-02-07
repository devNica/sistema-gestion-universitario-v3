import { type ProfileInfoEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model, type Optional } from 'sequelize'

interface ProfileInfoInputModel extends Optional<ProfileInfoEntity, 'id'> { }

export default class ProfileInfoModel extends Model<ProfileInfoEntity, ProfileInfoInputModel> implements ProfileInfoEntity {
  declare id: UUID
  declare firstname: string
  declare lastname: string
  declare birthdate: string
  declare dni: string
  declare phoneNumber: string
  declare nationality: string
  declare address: string
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
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'profile_info'
})
