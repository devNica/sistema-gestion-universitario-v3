import { type DatabaseOutputPort } from '@core/ports/output/db/db-output.port'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { type Sequelize } from 'sequelize'
import { ProfileHasPictureModel, ProfileInfoModel, RolModel, UserAccountModel, UserHasRoleModel } from './models'
import FileModel from './models/FileModel'

export class SequelizeAdapter implements DatabaseOutputPort {
  private readonly sequelize: Sequelize

  constructor () {
    this.sequelize = sequelizeInstance
  }

  async connect (): Promise<void> {
    try {
      await this.sequelize.authenticate()
    } catch (error) {
      throw new Error('Database connection failed')
    }
  }

  async syncModels (alter: boolean): Promise<void> {
    try {
      // FILE MODEL
      FileModel.hasMany(ProfileHasPictureModel, { foreignKey: 'file_id' })

      // PROFILE INFO MODEL
      ProfileInfoModel.hasMany(UserAccountModel, { foreignKey: 'profile_id' })
      ProfileInfoModel.hasMany(ProfileHasPictureModel, { foreignKey: 'profile_id' })

      // PROFILE HAS PICTURE MODEL
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'file_id' })
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'profile_id' })

      // ROL MODEL
      RolModel.hasMany(UserHasRoleModel, { foreignKey: 'rol_id' })

      // USER ACCOUNT MODEL
      UserAccountModel.belongsTo(ProfileInfoModel, { foreignKey: 'profile_id' })
      UserAccountModel.hasMany(UserHasRoleModel, { foreignKey: 'user_id' })

      // USER HAS ROLE MODEL
      UserHasRoleModel.belongsTo(UserAccountModel, { foreignKey: 'user_id' })
      UserHasRoleModel.belongsTo(RolModel, { foreignKey: 'rol_id' })

      if (alter) {
        await this.sequelize.sync({ alter })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
