import axios from 'axios'

export async function getManufacturers({loading}: GetManufacturers) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/manufacturers`,
      {
        withCredentials: true,
      }
    )
    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      loading(false)
      return error.response || null
    }
    loading(false)
    return null
  }
}

export async function getManufacturer({ id }: GetManufacturer) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/manufacturers/${id}`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function updateManufacturer({ id, name }: UpdateManufacturer) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/manufacturers/${id}`,
      { name: name },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function createManufacturer({ name }: CreateManufacturer) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/manufacturers`,
      { name: name },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function deleteManufacturer({ id }: GetManufacturer) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/manufacturers/${id}`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}
