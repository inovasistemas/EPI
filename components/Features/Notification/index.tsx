import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { normalizeDescription } from '@/components/Utils/NormalizeDescription'
import { updateNotification } from '@/services/Notification'
import { toast } from 'sonner'

export function NotificationModal({
  notification,
  modalAction,
  reload,
}: NotificationModalProps) {
  const handleUpdateNotification = async (action: string) => {
    const response = await updateNotification({
      id: notification.uuid,
      status: action,
    })

    if (response && response.status === 204) {
      toast.custom(() => (
        <ToastSuccess text='Notificação atualizada com sucesso' />
      ))
      modalAction()
      reload()
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar a notificação' />
      ))
    }
  }

  return (
    <div className='z-[200] flex flex-col justify-center items-center gap-6 w-full h-full'>
      <div className='flex flex-col items-start gap-3 w-full'>
        <h2 className='font-medium text-xl capitalize leading-none'>
          {notification.title.toLocaleLowerCase()}
        </h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            {normalizeDescription(notification.message.toLocaleLowerCase())}
          </span>
        </div>
      </div>

      <div className='gap-3 w-full'></div>

      <div className='flex flex-row justify-end w-full'>
        <div className='flex flex-row gap-3'>
          <button
            onClick={() => handleUpdateNotification('REJECTED')}
            type='button'
            className='group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
          >
            <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
              Recusar
            </span>
          </button>

          <button
            onClick={() => handleUpdateNotification('APPROVED')}
            type='button'
            className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          >
            <span className='font-medium text-sm'>Aprovar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
