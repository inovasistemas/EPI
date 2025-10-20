type RoutinesService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  q?: string
  collaborator?: string
  sector?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type RoutineService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

type UpdateRoutineEquipmentService = RoutineService & {
  equipment: string
  quantity: number
  order?: number
}

type RoutineEquipmentService = RoutineService & {
  equipmentId: string
}


type RoutineServiceDetails = RoutineServiceData & {
  uuid: string
  abc_classification?: string
}

type RoutineServiceData = {
  name: string
  cycle_quantity: number
  cycle_period: string
  collaborators?: string
  sectors?: string
  started_at: string
}

type RoutineEquipmentServiceData = {
  equipment: string
  quantity: number
  order?: number
} 

type UpdateRoutineService = RoutineServiceData & {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

type CreateRoutineService = RoutineServiceData & {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type CreateRoutineEquipmentService = RoutineEquipmentServiceData & {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  routine: string
}
