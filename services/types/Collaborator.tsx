type CollaboratorsService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  q?: string
  jobPosition?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type CollaboratorService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

type UpdateCollaboratorService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  name: string
  birthdate: string
  rg: string
  cpf: string
  gender: string
  job_position: string
  admission_date: string
  zip_code: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  phone: string
  observations: string
}

type CreateCollaboratorService = {
  name: string
  birthdate: string
  rg: string
  cpf: string
  gender: string
  job_position: string
  admission_date: string
  zip_code: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  phone: string
  observations: string
}
