import { RequestError } from '@/errors'
import { UsersRepository } from '@/infra/repositories'
import { UpdateUsersService } from '@/services/users'

import { mockUser, userModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'anyhash')
}))

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2022-09-01T00:00:00.000Z'))

describe('UpdateUsersService', () => {
  const usersRepository = {} as UsersRepository
  const service = new UpdateUsersService(usersRepository)

  describe('execute', () => {
    beforeEach(() => {
      usersRepository.update = jest.fn()
      usersRepository.findById = jest.fn()
    })

    it('should be able to update a user successfully', async () => {
      const updateUser = { ...userModel, firstAccessAt: new Date('2022-09-01T00:00:00.000Z') }
      usersRepository.findById = jest.fn().mockResolvedValue(updateUser)

      await service.execute('anyhash', mockUser)

      expect(usersRepository.update).toHaveBeenNthCalledWith(1, {
        ...userModel,
        id: 'anyhash',
        updatedAt: new Date('2022-09-01T00:00:00.000Z'),
        firstAccessAt: new Date('2022-09-01T00:00:00.000Z')
      })
    })

    it('should not be able to update non-existing user', async () => {
      const error = new RequestError('Usuário não existe.')

      const promise = service.execute('anyhash', mockUser)

      await expect(promise).rejects.toThrow(error)
      expect(usersRepository.findById).toHaveBeenNthCalledWith(1, userModel.id)
      expect(usersRepository.update).not.toHaveBeenCalled()
    })
  })
})
