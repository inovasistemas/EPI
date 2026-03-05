type NotificationModalProps = {
  notification: {
    uuid: string
    title: string
    message: string
    equipment_name: string
    equipment_picture: string
    equipment_quantity: number
  }
  status: boolean | null
  modalAction: () => void
  reload: () => void
}
