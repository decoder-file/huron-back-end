import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('doctors_schedules')
export class DoctorScheduleEntity extends BaseModel {
  @Column({ name: 'doctor_id' })
  doctorId!: string

  @Column()
  date!: string

  @Column()
  time!: string

  @Column()
  status!: string
}
