'use client'
import { getUnreadNotifications } from '@/services/Notification'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ToastDefault } from '../Template/Toast/Default'

export default function NotificationPoller() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getUnreadNotifications()
      if (response && response.status === 200) {
        const data = response.data
        if (data.total > 0) {
          toast.custom(t => (
            <ToastDefault
              redirectTo='/notificacoes'
              text={`${data.data.message}`}
            />
          ))
        }
      }
    }, 600000)

    return () => clearInterval(interval)
  }, [])

  return null
}
