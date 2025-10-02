export type SelectCategoriesProps = {
  value: string
  onChange: (event: string) => void
  CategoriesData: CategoriesDataType[]
}

type CategoriesDataType = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
  subcategories: SubcategoriesType[]
}

type SubcategoriesType = {
  uuid: string
  name: string
  active_equipments: string
  created_at: string
  updated_at: string
}
