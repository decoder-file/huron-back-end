import { DoctorDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class DoctorModel extends BaseModel {
  userId: string
  cpf: string
  crm: string
  speciality: string

  constructor (doctor: DoctorDTO, id?: string) {
    super(doctor, id)
    this.userId = doctor.userId
    this.cpf = doctor.cpf
    this.crm = doctor.crm
    this.speciality = doctor.speciality
    this.createdAt = new Date()
    this.updatedAt = null
  }
}
