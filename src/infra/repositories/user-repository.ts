import { BaseRepository } from './base-repository'
import { UserEntity } from '@/infra/entities'

export class UsersRepository extends BaseRepository<UserEntity> {
  async findById (id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['profile', 'profile.profilePermissions']
    })
    return user
  }

  async findByEmail (email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['profile', 'profile.profilePermissions']
    })
    return user
  }
}
