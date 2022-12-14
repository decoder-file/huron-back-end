import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('clinics')
export class ClinicEntity extends BaseModel {
  @Column()
  name!: string

  @Column()
  address!: string

  @Column()
  cep!: string

  @Column({ name: 'administrator_id' })
  administratorId!: string

  @Column({ name: 'type' })
  typeOfClinic?: string

  @Column()
  description?: string

  @Column()
  phone?: string
}
