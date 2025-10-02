export type SelectJobPositionsProps = {
  value: string
  onChange: (event: string) => void
  jobPositionsData: JobPositionsData[]
}

type JobPositionsData = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
}
