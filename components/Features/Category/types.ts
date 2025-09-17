type SubcategoryType = {
  uuid: string
  name: string
  parent: string
  created_at: string
  updated_at?: string
}

type CategoryType = {
  uuid: string
  name: string
  active_equipments: number
  parent: string
  created_at: string
  updated_at?: string
  subcategories: [SubcategoryType]
}
