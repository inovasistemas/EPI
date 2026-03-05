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

type CreateNotificationProps = {
  equipment: string
  message: string
  needs_approval: boolean
  status: string
  title: string
  withdrawal_at: Date
  collaborator: string
  quantity: number
  event: string
}