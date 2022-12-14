import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/app'
import { mysqlSource } from '@/infra/mysql-connection'

mysqlSource.initialize()
  .then(() => app.listen(3333, () => console.log('Server running!')))
  .catch(console.error)
