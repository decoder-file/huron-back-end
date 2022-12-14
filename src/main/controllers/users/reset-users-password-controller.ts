import { RequestError } from '@/errors'
import { ResetUsersPasswordService } from '@/services/users'

import { Request, Response } from 'express'

export class ResetUsersPasswordController {
  constructor (private readonly service: ResetUsersPasswordService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.service.execute(String(req.query.token), req.body.password)
      res.sendStatus(200)
    } catch (error) {
      if (error instanceof RequestError) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
}
