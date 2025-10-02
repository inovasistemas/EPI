export type SelectManufacturersProps = {
  value: string
  onChange: (event: string) => void
  ManufacturersData: ManufacturersDataType[]
}

type ManufacturersDataType = {
  uuid: string
  name: string
  active_equipments: string
  created_at: string
  updated_at: string
}
