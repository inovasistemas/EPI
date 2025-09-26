import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getSectors() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function getSector(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors/${id}`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}

export async function updateSector(id: string, name: string, inherit: boolean) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors/${id}`,
      {
        name,
        inherit,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}

export async function createSector(name: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors`,
      {
        name,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}

export async function createSubsector(
  id: string,
  name: string,
  inherit: boolean
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors`,
      {
        name,
        parent: id,
        inherit: inherit,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}

export async function deleteSector(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors/${id}`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}
