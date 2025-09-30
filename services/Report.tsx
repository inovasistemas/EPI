import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getSummaryReports({ loading }: GetSummaryReports) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/reports/summary`,
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
