import { type CampusHasCourseDB } from '@core/domain/entities/BackOfficeEntity'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model } from 'sequelize'

export default class CampusHasCourseModel extends Model<CampusHasCourseDB> implements CampusHasCourseDB {
  declare campusId: string
  declare courseId: string
}

CampusHasCourseModel.init({
  campusId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'campus',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'course',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'campus_has_course'
})
