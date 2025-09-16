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

export async function getEquipment({ loading, id }: EquipmentService) {
  try {
    loading(true)

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/equipments/${id}`,
      { withCredentials: true }
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

export async function updateEquipment({
  loading,
  id,
  additional_code,
  approval_certification,
  category,
  composition,
  cost,
  details,
  dimensions,
  disposable,
  ean,
  expiration_date,
  family,
  manufacturer,
  measure,
  name,
  picture,
  price,
  stock,
  stock_control,
  stock_location,
  stock_maximum,
  stock_minimum,
  weight,
  weight_measure,
}: UpdateEquipmentService) {
  try {
    loading(true)
    const data: EquipmentServiceData = {}

    if (additional_code) data.additional_code = additional_code
    if (approval_certification)
      data.approval_certification = approval_certification
    if (category) data.category = category
    if (composition) data.composition = composition
    if (cost) data.cost = cost
    if (details) data.details = details
    if (dimensions) data.dimensions = dimensions
    if (disposable) data.disposable = disposable
    if (ean) data.ean = ean
    if (expiration_date) data.expiration_date = expiration_date
    if (family) data.family = family
    if (manufacturer) data.manufacturer = manufacturer
    if (measure) data.measure = measure
    if (name) data.name = name
    if (picture) data.picture = picture
    if (price) data.price = price
    if (stock) data.stock = stock
    if (stock_control) data.stock_control = stock_control
    if (stock_location) data.stock_location = stock_location
    if (stock_maximum) data.stock_maximum = stock_maximum
    if (stock_minimum) data.stock_minimum = stock_minimum
    if (weight) data.weight = weight
    if (weight_measure) data.weight_measure = weight_measure

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/equipments/${id}`,
      data,
      { withCredentials: true }
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

export async function createEquipment({
  loading,
  additional_code,
  approval_certification,
  category,
  composition,
  cost,
  details,
  dimensions,
  disposable,
  ean,
  expiration_date,
  family,
  manufacturer,
  measure,
  name,
  picture,
  price,
  stock,
  stock_control,
  stock_location,
  stock_maximum,
  stock_minimum,
  weight,
  weight_measure,
}: CreateEquipmentService) {
  try {
    loading(true)
    const data: EquipmentServiceData = {}

    if (additional_code) data.additional_code = additional_code
    if (approval_certification)
      data.approval_certification = approval_certification
    if (category) data.category = category
    if (composition) data.composition = composition
    if (cost) data.cost = cost
    if (details) data.details = details
    if (dimensions) data.dimensions = dimensions
    if (disposable) data.disposable = disposable
    if (ean) data.ean = ean
    if (expiration_date) data.expiration_date = expiration_date
    if (family) data.family = family
    if (manufacturer) data.manufacturer = manufacturer
    if (measure) data.measure = measure
    if (name) data.name = name
    if (picture) data.picture = picture
    if (price) data.price = price
    if (stock) data.stock = stock
    if (stock_control) data.stock_control = stock_control
    if (stock_location) data.stock_location = stock_location
    if (stock_maximum) data.stock_maximum = stock_maximum
    if (stock_minimum) data.stock_minimum = stock_minimum
    if (weight) data.weight = weight
    if (weight_measure) data.weight_measure = weight_measure

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/equipments`,
      data,
      { withCredentials: true }
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

export async function deleteEquipment({ loading, id }: EquipmentService) {
  try {
    loading(true)

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/equipments/${id}`,
      { withCredentials: true }
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
