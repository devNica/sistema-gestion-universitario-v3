import { type DatabaseOutputPort } from '@core/ports/output/db/db-output.port'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { type Sequelize } from 'sequelize'
import { AdmissionModel, CampusHasCourseModel, CampusModel, CourseModel, CourseProgramModel, EnrollmentTypeModel, FileModel, OrgUnitModel, ProfileHasPictureModel, ProfileInfoModel, RolModel, StudentModel, UserAccountModel, UserHasRoleModel } from './models'

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
      AdmissionModel.belongsTo(ProfileInfoModel, { foreignKey: 'applicantId' })

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

      // PROFILE INFO MODEL
      ProfileInfoModel.hasMany(UserAccountModel, { foreignKey: 'profileId' })
      ProfileInfoModel.hasMany(ProfileHasPictureModel, { foreignKey: 'profileId' })
      ProfileInfoModel.hasOne(AdmissionModel, { foreignKey: 'applicantId' })
      ProfileInfoModel.hasMany(StudentModel, { foreignKey: 'profileId' })

      // PROFILE HAS PICTURE MODEL
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'fileId' })
      ProfileHasPictureModel.belongsTo(FileModel, { foreignKey: 'profileId' })

      // ROL MODEL
      RolModel.hasMany(UserHasRoleModel, { foreignKey: 'rolId' })
      RolModel.belongsToMany(UserAccountModel, { through: 'user_has_role', foreignKey: 'rolId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })

      // STUDENT MODEL
      StudentModel.belongsTo(ProfileInfoModel, { foreignKey: 'profileId' })
      StudentModel.belongsTo(EnrollmentTypeModel, { foreignKey: 'enrollmentTypeId' })
      StudentModel.belongsTo(CampusModel, { foreignKey: 'campusId' })
      StudentModel.belongsTo(CourseProgramModel, { foreignKey: 'courseProgramId' })

      // USER ACCOUNT MODEL
      UserAccountModel.belongsTo(ProfileInfoModel, { foreignKey: 'profileId' })
      UserAccountModel.belongsToMany(RolModel, { through: 'user_has_role', foreignKey: 'userId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' })

      if (alter) {
        await this.sequelize.sync({ alter })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
