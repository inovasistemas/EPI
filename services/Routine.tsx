import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getRoutines({
  loading,
  q,
  collaborator,
  sector,
  sortField,
  sortOrder,
  page = 1,
}: RoutinesService) {
  try {
    loading(true)

    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (collaborator) params.collaborator = collaborator
    if (sector) params.sector = sector

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines`,
      { params, withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      loading(false)
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function getRoutine({ loading, id }: RoutineService) {
  try {
    loading(true)

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${id}`,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function updateRoutineEquipment({
  loading,
  id,
  quantity,
  equipment,
  order = 0
}: UpdateRoutineEquipmentService) {
  try {
    loading(true)

    const data = {
      quantity,
      order
    }
    
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${id}/equipments/${equipment}`,
      data,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      loading(false)
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function createRoutine({
  loading,
  name,
  cycle_quantity,
  cycle_period,
  collaborators,
  sectors,
  started_at
}: CreateRoutineService) {
  try {
    loading(true)
    const data: RoutineServiceData = {
      name,
      cycle_quantity,
      cycle_period,
      started_at
    }

    if (collaborators) data.collaborators = collaborators
    if (sectors) data.sectors = sectors

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines`,
      data,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function updateRoutine({
  loading,
  id,
  name,
  cycle_quantity,
  cycle_period,
  collaborators,
  sectors,
  started_at
}: UpdateRoutineService) {
  try {
    loading(true)
    const data: RoutineServiceData = {
      name,
      cycle_quantity,
      cycle_period,
      started_at
    }

    if (collaborators) data.collaborators = collaborators
    if (sectors) data.sectors = sectors

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${id}`,
      data,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function createRoutineEquipment({
  loading,
  routine,
  equipment,
  quantity,
  order = 0
}: CreateRoutineEquipmentService) {
  try {
    loading(true)
    const data: RoutineEquipmentServiceData = {
      equipment,
      quantity,
      order,
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${routine}/equipments`,
      data,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function deleteRoutine({ loading, id }: RoutineService) {
  try {
    loading(true)

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${id}`,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      loading(false)
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function deleteRoutineEquipment({ loading, id, equipmentId }: RoutineEquipmentService) {
  try {
    loading(true)

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/routines/${id}/equipments/${equipmentId}`,
      { withCredentials: true },
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      loading(false)
      return error.response || null
    }

    loading(false)
    return null
  }
}