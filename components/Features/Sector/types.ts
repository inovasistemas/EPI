type SubSectorType = {
  uuid: string
  name: string
  parent: string
  inherit: boolean
  created_at: string
  updated_at?: string
}

type SectorType = {
  uuid: string
  name: string
  active_collaborators: number
  parent: string
  inherit: boolean
  created_at: string
  updated_at?: string
  subsectors: [SubSectorType]
}
