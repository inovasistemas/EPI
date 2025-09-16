type EquipmentsService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  q?: string
  manufacturer?: string
  category?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type EquipmentService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

type EquipmentServiceData = {
  additional_code?: string
  approval_certification?: string
  category?: string
  composition?: string
  cost?: number
  details?: string
  dimensions?: string
  disposable?: boolean
  ean?: string
  expiration_date?: string
  family?: string
  manufacturer?: string
  measure?: string
  name?: string
  picture?: string
  price?: number
  stock?: number
  stock_control?: boolean
  stock_location?: string
  stock_maximum?: string
  stock_minimum?: string
  weight?: string
  weight_measure?: string
}

type UpdateEquipmentService = EquipmentServiceData & {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

type CreateEquipmentService = EquipmentServiceData & {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}
