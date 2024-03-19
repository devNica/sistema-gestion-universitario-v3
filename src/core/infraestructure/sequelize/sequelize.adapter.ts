import { type DatabaseOutputPort } from '@core/application/ports/database.port'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { type Sequelize } from 'sequelize'
import {
  AdmissionModel,
  CampusModel,
  CampusHasCourseModel,
  CourseModel,
  StudentModel,
  OrgUnitModel,
  CourseProgramModel,
  EnrollmentTypeModel,
  FileModel,
  ProfileHasPictureModel,
  UserAccountModel,
  RolModel,
  UserHasRoleModel,
  PersonalInfoModel
} from './models'

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
      // ADMISSION MODEL
      AdmissionModel.belongsTo(PersonalInfoModel, { foreignKey: 'applicantId' })

      // CAMPUS MODEL
      CampusModel.hasMany(CampusHasCourseModel, { foreignKey: 'campusId' })
      CampusModel.belongsToMany(CourseModel, { through: 'campus_has_course', foreignKey: 'campusId' })
      CampusModel.hasMany(StudentModel, { foreignKey: 'campusId' })

      // CAMPUS HAS COURSE MODEL
      CampusHasCourseModel.belongsTo(CampusModel, { foreignKey: 'campusId' })
      CampusHasCourseModel.belongsTo(CourseModel, { foreignKey: 'courseId' })

      // CAREER MODEL
      CourseModel.belongsTo(OrgUnitModel, { foreignKey: 'unitId' })
      CourseModel.hasMany(CampusHasCourseModel, { foreignKey: 'courseId' })
      CourseModel.belongsToMany(CampusModel, { through: 'campus_has_course', foreignKey: 'courseId' })

      // COURSE PROGRAM MODEL
      CourseProgramModel.hasMany(StudentModel, { foreignKey: 'courseProgramId' })

      // ENROLLMENT TYPE MODEL
      EnrollmentTypeModel.hasMany(StudentModel, { foreignKey: 'enrollmentTypeId' })

      // FILE MODEL
      FileModel.hasMany(ProfileHasPictureModel, { foreignKey: 'fileId' })

      // ORGANIZATION UNIT MODEL
      OrgUnitModel.hasMany(CourseModel, { foreignKey: 'unitId' })

      // PERSONAL INFO MODEL
      PersonalInfoModel.hasMany(UserAccountModel, { foreignKey: 'infoId' })
      PersonalInfoModel.hasMany(ProfileHasPictureModel, { foreignKey: 'infoId' })
      PersonalInfoModel.hasOne(AdmissionModel, { foreignKey: 'applicantId' })
      PersonalInfoModel.hasMany(StudentModel, { foreignKey: 'infoId' })

      // PROFILE HAS PICTURE MODEL
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'fileId' })
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'infoId' })

      // ROL MODEL
      RolModel.hasMany(UserHasRoleModel, { foreignKey: 'rolId' })
      RolModel.belongsToMany(UserAccountModel, { through: 'user_has_role', foreignKey: 'rolId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })

      // STUDENT MODEL
      StudentModel.belongsTo(PersonalInfoModel, { foreignKey: 'infoId' })
      StudentModel.belongsTo(EnrollmentTypeModel, { foreignKey: 'enrollmentTypeId' })
      StudentModel.belongsTo(CampusModel, { foreignKey: 'campusId' })
      StudentModel.belongsTo(CourseProgramModel, { foreignKey: 'courseProgramId' })

      // USER ACCOUNT MODEL
      UserAccountModel.belongsTo(PersonalInfoModel, { foreignKey: 'infoId' })
      UserAccountModel.belongsToMany(RolModel, { through: 'user_has_role', foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })

      if (alter) {
        await this.sequelize.sync({ alter })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
