import { type CampusHasCourseEntity } from '@core/models/entities/organization-unit.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { DataTypes, Model } from 'sequelize'

export default class CampusHasCourseModel extends Model<CampusHasCourseEntity> implements CampusHasCourseEntity {
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
