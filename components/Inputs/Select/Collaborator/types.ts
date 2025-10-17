export type SelectCollaboratorsProps = {
  value: string
  onChange: (event: string) => void
  CollaboratorsData: CollaboratorsDataType[]
  background?: string
}

type CollaboratorsDataType = {
  uuid: string
  name: string
  cpf: string
  job_position: string
  created_at: string
}

