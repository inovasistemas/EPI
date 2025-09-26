type JobPosition = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at?: string
}

type JobPositionsProps = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type getJobPositionProps = {
  id: string,
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type CreateJobPosition = {
  payload: JobPosition
}

type UpdateJobPosition = {
  id: string
  payload: JobPosition
}
