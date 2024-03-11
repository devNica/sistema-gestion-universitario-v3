import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import { type OrganizationalUnitIC, type CampusIC } from '@org/domain/models/controllers/controller-input.model'
import { type InsertCourseOP, type InsertCampusOP, type InsertKnowledgeAreaOP, type FetchCoursetByKnowledgeAreaOP, type InsertCampusCoursesOP } from '@org/domain/ports/output/organization-output.port'
import { UniqueConstraintError, ValidationError } from 'sequelize'
import { type CampusHasCourseIR, type CourseIR } from '@org/domain/models/repositories/repository-input.model'
import { type CourseEntity } from '@core/models/entities/organization-unit.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { CampusHasCourseModel, CourseModel, OrgUnitModel, CampusModel } from '@core/adapters/secondary/orm/sequelize/models'

class OrganizationRepository implements
InsertCampusOP, InsertKnowledgeAreaOP,
InsertCourseOP, FetchCoursetByKnowledgeAreaOP, InsertCampusCoursesOP {
  async insertCampusCourses (dto: Required<CampusHasCourseIR>): Promise<void> {
    try {
      await Promise.all(dto.courses.map(async (course) => {
        await CampusHasCourseModel.create({
          courseId: course.id,
          campusId: dto.campusId
        })
      }))
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Registro de oferta academica fallida')
      }
    }
  }

  async fetchCourseByKnowledgeArea (unitId: UUID): Promise<Array<Required<CourseEntity>> | never> {
    try {
      const result = await CourseModel.findAll({
        where: {
          unitId
        },
        attributes: {
          exclude: ['unitId']
        }
      })

      return result
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Consulta de cursos por unidad fallida')
      }
    }
  }

  async insertCourse (dto: CourseIR): Promise<void> {
    try {
      await CourseModel.create({ ...dto })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de unidad organizativa fallida')
      }
    }
  }

  async insertKnowledgeArea (dto: Required<OrganizationalUnitIC>): Promise<void> {
    try {
      await OrgUnitModel.create({ ...dto })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de unidad organizativa fallida')
      }
    }
  }

  async insertCampus (dto: Required<CampusIC>): Promise<void> {
    try {
      await CampusModel.create({ ...dto })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de sede fallida')
      }
    }
  }
}

const orgRepository = new OrganizationRepository()

const insertCampusRepo: InsertCampusOP = orgRepository
const insertKnowledgeAreaRepo: InsertKnowledgeAreaOP = orgRepository
const insertCourseRepo: InsertCourseOP = orgRepository
const fetchCourseByKnowledgeAreaRepo: FetchCoursetByKnowledgeAreaOP = orgRepository
const insertCampusCourseRepo: InsertCampusCoursesOP = orgRepository

export {
  insertCampusRepo,
  insertKnowledgeAreaRepo,
  insertCourseRepo,
  fetchCourseByKnowledgeAreaRepo,
  insertCampusCourseRepo
}
