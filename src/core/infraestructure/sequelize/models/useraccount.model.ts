import { type UserAccountDB } from '@core/domain/entities/AuthEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model, NOW, type Optional } from 'sequelize'

interface UserAccountInputModel extends Optional<UserAccountDB, 'id' | 'expiresIn' | 'createdAt' | 'updatedAt' | 'isRoot' | 'state'> { }

export default class UserAccountModel extends Model<UserAccountDB, UserAccountInputModel> implements UserAccountDB {
  declare id: UUID
  declare username: string
  declare password: string
  declare isRoot: boolean
  declare state: boolean
  declare expiresIn: number
  declare createdAt: Date
  declare updatedAt: Date
  declare personalInfo: string
}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  personalInfo: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  isRoot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  expiresIn: {
    type: DataTypes.BIGINT,
    allowNull: false
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
  modelName: 'user_account'
})
