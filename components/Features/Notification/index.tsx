import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { normalizeDescription } from '@/components/Utils/NormalizeDescription'
import { updateNotification } from '@/services/Notification'
import Image from "next/image"
import { toast } from 'sonner'

export function NotificationModal({
  notification,
  modalAction,
  reload,
  status
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
    <div x-data={`${status}`}  className='z-[200] flex flex-col justify-center items-center gap-6 w-full h-full'>
      <div className='flex flex-col items-center gap-3 w-full'>
        <h2 className='font-medium text-xl text-center capitalize'>
          {notification.title.toLocaleLowerCase()}
        </h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            {normalizeDescription(notification.message.toLocaleLowerCase())}
          </span>
        </div>
      </div>

      <div className='gap-3 w-full'>
        <li
          className="flex flex-row gap-3 h-16 min-h-16"
        >
          <div className="relative bg-[--backgroundSecondary] rounded-xl w-16 min-w-16 aspect-square overflow-hidden">
            {notification.equipment_picture && notification.equipment_picture.length > 3 && (
              <Image
                src={`https://api.inovasistemas.app${notification.equipment_picture}`}
                alt={notification.equipment_name || "Imagem"}
                fill
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex justify-start items-center -mt-0.5 w-full h-full">
            <span className="inline-block overflow-hidden font-normal text-base text-ellipsis capitalize leading-none whitespace-nowrap">
              {notification.equipment_name?.toLocaleLowerCase()}
            </span>
          </div>
          <div className="flex justify-end items-center gap-3 -mt-0.5 w-full h-full">
            <span className="pr-3 font-medium text-[--text]">
              x{notification.equipment_quantity}
            </span>
          </div>
        </li>
      </div>

      {status == null && (
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
      )}

      {status != null && (
        <div className='flex flex-row justify-end w-full'>
          <div className='flex flex-row gap-3'>
            <div className="group relative flex flex-row justify-center items-center gap-3 bg-[--buttonPrimary] disabled:bg-[--buttonPrimary] px-4 py-3 rounded-xl font-medium text-[--textSecondary] disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none">
              <span className="font-medium text-sm">
                {status
                  ? "Aprovado"
                  : "Recusado"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
