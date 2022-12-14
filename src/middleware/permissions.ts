import { ModulesRepository, UsersRepository } from '@/infra/repositories'
import { ModuleEntity, ProfilePermissionEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

import { NextFunction, Request, Response } from 'express'

const httpVerbToPermissionActionMap = {
  GET: 'read',
  POST: 'create',
  PUT: 'update',
  PATCH: 'update',
  DELETE: 'delete'
}

export const accessProfilePermission = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { method: httpVerb, route, modulesIds, userId } = request
    const { path: fullEndpoint } = route
    const relatedAction = setRelatedAction(httpVerb)
    const user = await getUser(userId)
    const modules = await getModules(modulesIds)
    const moduleExists = modules?.find(module => module.endpoint === fullEndpoint)
    if (!moduleExists) return response.status(401).json({ message: 'Módulo não encontrado.' })
    if (user) {
      const hasPermission = checkPermission(user.profile.profilePermissions, relatedAction, moduleExists)
      if (hasPermission) return next()
      response.status(401).json({ message: 'Acesso negado.' })
    }
  }
}

async function getUser (userId: string): Promise<UserEntity | null> {
  const model = mysqlSource.getRepository(UserEntity)
  const userRepository = new UsersRepository(model)
  const user = await userRepository.findById(userId)
  return user
}

async function getModules (moduleIds: string[]): Promise<ModuleEntity[] | null> {
  const model = mysqlSource.getRepository(ModuleEntity)
  const modulesRepository = new ModulesRepository(model)
  const modules = await modulesRepository.findModulesByIds(moduleIds)
  return modules
}

function checkPermission (profilePermissions: ProfilePermissionEntity[], relatedAction: string, module: ModuleEntity): boolean {
  let actionAllowed: any
  for (const permission of profilePermissions) {
    if (permission.moduleId === module.id) {
      actionAllowed = permission[relatedAction as keyof typeof permission]
    }
  }
  return !!actionAllowed
}

function setRelatedAction (httpVerb: string): string {
  const permission = httpVerbToPermissionActionMap[httpVerb.toUpperCase() as keyof typeof httpVerbToPermissionActionMap]
  return permission
}
