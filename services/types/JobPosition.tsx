type JobPosition = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at?: string
}

type CreateJobPosition = {
  payload: JobPosition
}

type UpdateJobPosition = {
  id: string
  payload: JobPosition
}
