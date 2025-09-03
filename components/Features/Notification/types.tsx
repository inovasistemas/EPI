type NotificationModalProps = {
  notification: {
    uuid: string
    title: string
    message: string
  }
  modalAction: () => void
  reload: () => void
}
