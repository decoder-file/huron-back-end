import { PasswordRecoveryTokenController } from '@/main/controllers/users'
import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { PasswordRecoveryTokenService } from '@/services/users'
import { UserEntity, UserTokenEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { SendMailService } from '@/services/send-mail'
import { NodemailerProvider } from '@/infra/mail/mail-provider'
import { HandlebarsMailTemplateProvider } from '@/infra/mail/template-provider'

export const PasswordRecoveryTokenControllerFactory = (): PasswordRecoveryTokenController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const usersRepository = new UsersRepository(userModel)
  const userTokenModel = mysqlSource.getRepository(UserTokenEntity)
  const usersTokensRepository = new UsersTokensRepository(userTokenModel)
  const mailTemplateProvider = new HandlebarsMailTemplateProvider()
  const mailProvider = new NodemailerProvider(mailTemplateProvider)
  const mailService = new SendMailService(mailProvider)
  const service = new PasswordRecoveryTokenService(usersRepository, usersTokensRepository, mailService)
  const controller = new PasswordRecoveryTokenController(service)
  return controller
}
