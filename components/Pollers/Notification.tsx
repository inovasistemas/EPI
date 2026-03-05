'use client'
import { getUnreadNotifications, updateNotificationDelivered } from '@/services/Notification'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ToastDefault } from '../Template/Toast/Default'

export default function NotificationPoller() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getUnreadNotifications()
      if (response && response.status === 200) {
        const data = response.data
        if (data?.total > 0 && Array.isArray(data?.data)) {
          for (const current_notification of data.data) {
            toast.custom(() => (
              <ToastDefault
                redirectTo="/notificacoes"
                text={current_notification.message}
              />
            ))

            await updateNotificationDelivered({
              id: current_notification.uuid
            })
          }
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return null
}
