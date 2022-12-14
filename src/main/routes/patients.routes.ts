import {
  CreatePatientsControllerFactory,
  UpdatePatientsControllerFactory,
  DeletePatientsControllerFactory,
  GetPatientsControllerFactory,
  GetPatientsByIdControllerFactory,
  GeneratePatientsPDFControllerFactory
} from '@/main/factories/controllers/patients'
import { accessProfilePermission, ensuredAuthenticated, clinicMiddleware } from '@/middleware'

import { Router } from 'express'

const createPatientsController = CreatePatientsControllerFactory()
const updatePatientsController = UpdatePatientsControllerFactory()
const deletePatientsController = DeletePatientsControllerFactory()
const getPatientsController = GetPatientsControllerFactory()
const getPatientsByIdController = GetPatientsByIdControllerFactory()
const generatePatientsPDFControllerFactory = GeneratePatientsPDFControllerFactory()

export default (router: Router): void => {
  router.post('/patients/generate-pdf', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => generatePatientsPDFControllerFactory.handle(req, res))
  router.get('/patients', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getPatientsController.handle(req, res))
  router.get('/patients/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => getPatientsByIdController.handle(req, res))
  router.post('/patients', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => createPatientsController.handle(req, res))
  router.patch('/patients/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => updatePatientsController.handle(req, res))
  router.delete('/patients/:id', ensuredAuthenticated(), clinicMiddleware(), accessProfilePermission(), async (req, res) => deletePatientsController.handle(req, res))
}
