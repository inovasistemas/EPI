import { logoutUserOn401 } from '@/utils/logout'
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
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function getNotifications({ status, limit }: NotificationProps) {
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
      if (error.response?.status === 401) {
				logoutUserOn401()
			}
      return error.response || null
    }
    return null
  }
}

export async function updateNotification({
  id,
  status,
}: UpdateNotificationProps) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/notifications/${id}`,
      {
        status,
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

export async function updateNotificationRead({
  id,
}: UpdateNotificationReadProps) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/notifications/${id}/read`,
      {},
      { withCredentials: true }
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
