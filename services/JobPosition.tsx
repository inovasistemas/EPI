import axios from 'axios'

export async function getJobPositions({loading}: JobPositionsProps) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/job-positions`,
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

export async function getJobPosition({id, loading}: getJobPositionProps) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/job-positions/${id}`,
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

export async function createJobPosition({ payload }: CreateJobPosition) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/job-positions`,
      payload,
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

export async function updateJobPosition({ id, payload }: UpdateJobPosition) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/job-positions/${id}`,
      payload,
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

export async function deleteJobPosition(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/job-positions/${id}`,
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
