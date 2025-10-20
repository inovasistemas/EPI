export type SelectCollaboratorsProps = {
  value: {
    value: string
    label: string
  }[]
  onChange: (value: { value: string; label: string }[]) => void
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

