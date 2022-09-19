import { RequestError } from '@/errors'
import { DeleteClinicsService } from '@/services/clinics'

import { Request, Response } from 'express'

export class DeleteClinicsController {
  constructor (private readonly deleteClinicsService: DeleteClinicsService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteClinicsService.execute(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(404).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}