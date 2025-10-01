type NotificationProps = {
  status?: string
  limit?: number
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type UpdateNotificationProps = {
  id: string
  status: string
}

type UpdateNotificationReadProps = {
  id: string
}
