import axios from 'axios'

export async function getUnreadNotifications() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/notifications/unread`,
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

export async function getNotifications({ status, limit }: NotificatioProps) {
  try {
    const params: Record<string, any> = {}

    params.status = status ? status : 'ALL'
    params.limit = limit ? limit : 100

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/notifications`,
      { params, withCredentials: true }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}
