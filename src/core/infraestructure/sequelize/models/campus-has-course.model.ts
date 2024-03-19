import { type CampusHasCourseDB } from '@core/domain/entities/BackOfficeEntity'
import { type UUID } from '@core/domain/models/customs/custom-types.model'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { DataTypes, Model } from 'sequelize'

export default class CampusHasCourseModel extends Model<CampusHasCourseDB> implements CampusHasCourseDB {
  declare campusId: UUID
  declare courseId: UUID
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
