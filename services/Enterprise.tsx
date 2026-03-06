import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getEnterprise({loading}: GetEnterpriseProps) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/enterprise`,
      {
        withCredentials: true,
      }
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

export async function updateEnterprise({
  address,
  address_number,
  city,
  commercial_name,
  email,
  id,
  loading,
  logo,
  neighborhood,
  phone_number,
  postal_code,
  state,
}: UpdateEnterpriseProps) {
  try {
    loading(true)
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/enterprise`,
      {
        address,
        address_number,
        city,
        commercial_name,
        email,
        id,
        loading,
        logo,
        neighborhood,
        phone_number,
        postal_code,
        state,
      },
      {
        withCredentials: true,
      }
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