import axios from 'axios'

export async function getEquipments({
  loading,
  q,
  manufacturer,
  category,
  sortField,
  sortOrder,
  page = 1,
}: EquipmentsService) {
  try {
    loading(true)

    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (manufacturer) params.manufacturer = manufacturer
    if (category) params.category = category

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/equipments`,
      { params, withCredentials: true }
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }

    loading(false)
    return null
  }
}
