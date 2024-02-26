import { type RegisterInitAccuOP } from '@auth/ports/output/applicant-repository.output.port'
import { type UUID } from '@core/models/generic/custom-types.model'
import { AdmissionModel } from '../orm/sequelize/models'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import { QueryError } from 'sequelize'

class ApplicantRepositoryAdapter implements RegisterInitAccuOP {
  async registerInitAccu (initAccu: number, applicantId: UUID): Promise<void> {
    try {
      await AdmissionModel.create({
        initAccu,
        applicantId
      })
    } catch (error) {
      console.error(error)
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al registrar acumulado inicial del aspirante')
      }
    }
  }
}

const applicantRepoAdapter = new ApplicantRepositoryAdapter()

const registerInitAccuRepo: RegisterInitAccuOP = applicantRepoAdapter

export {
  registerInitAccuRepo
}
