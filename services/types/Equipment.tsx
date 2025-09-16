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
