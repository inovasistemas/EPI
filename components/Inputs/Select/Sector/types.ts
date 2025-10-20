export type SelectSectorsProps = {
  value: {
    value: string
    label: string
  }[]
  onChange: (value: { value: string; label: string }[]) => void
  SectorsData: SectorsDataType[]
  background?: string
}

type SectorsDataType = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
  subsectors: SubsectorsType[]
}

type SubsectorsType = {
  uuid: string
  name: string
  active_collaborators: string
  created_at: string
  updated_at: string
}
