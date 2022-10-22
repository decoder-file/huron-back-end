import { RequestError } from '@/errors'
import { CreateDoctorsSchedulesService } from '@/services/doctors-schedules'

import { Request, Response } from 'express'

export class CreateDoctorsSchedulesController {
  constructor (private readonly service: CreateDoctorsSchedulesService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(req.body)
      res.sendStatus(201)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
