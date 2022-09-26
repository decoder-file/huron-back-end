import { RequestError } from '@/errors'
import { UpdateUsersController } from '@/main/controllers/users'
import { UpdateUsersService } from '@/services/users'
import { mockUser } from '@/tests/mocks'

describe('UpdateUsersController', () => {
  const usersService = {} as UpdateUsersService
  const usersController = new UpdateUsersController(usersService)
  const req: any = { body: jest.fn(), params: jest.fn() }
  const res: any = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() }

  beforeAll(() => {
    req.body = mockUser
    req.params = { id: 'any-id' }
  })

  describe('handle', () => {
    it('should be able to update new user', async () => {
      usersService.execute = jest.fn()

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update new user', async () => {
      const error = new RequestError('some-error')
      usersService.execute = jest.fn().mockRejectedValue(error)

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to update a new user and must return some server error ', async () => {
      const error = new Error('some-error')
      usersService.execute = jest.fn().mockRejectedValue(error)

      await usersController.handle(req, res)

      expect(usersService.execute).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { error })
    })
  })
})
