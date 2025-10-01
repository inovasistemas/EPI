import { SubNavLink } from '@/components/Navigation/SubNavLink'
import { SubNavLinkAction } from '@/components/Navigation/SubNavLinkAction'
import { formatDistance } from '@/components/Utils/FormatDistance'
import { normalizeDescription } from '@/components/Utils/NormalizeDescription'
import { getNotifications } from '@/services/Notification'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Skeleton } from '@/components/ui/skeleton'

type NotificationParam = {
  uuid: string
  title: string
  message: string
  status: string
  answered_at: string
  needs_approval: boolean
  approved: boolean
  created_at: string
}

type MenuNotificationsProps = {
  itemAction: (notification: NotificationParam) => void
}

export function MenuNotifications({ itemAction }: MenuNotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationParam[]>()
  const [loading, setLoading] = useState(false)
  const fetchedNotifications = useRef(false)

  const fetchNotifications = async () => {
    setLoading(true)
    const response = await getNotifications({loading: setLoading})

    if (response && response.status === 200) {
      const data = response.data
      setNotifications(data.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (fetchedNotifications.current) return
    fetchedNotifications.current = true
    fetchNotifications()
  }, [])

  return (
    <ul className='flex flex-col gap-1 p-3 text-sm transition-all duration-300 select-none'>
      {loading && (
        <motion.div
          key='loading'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='flex justify-center items-start py-0 w-full h-full'
        >
          <div className='flex flex-col gap-1 w-full text-left'>
            <Skeleton className='rounded-lg w-1/2 h-6' />
            <Skeleton className='rounded-lg w-full h-6' />
          </div>
        </motion.div>
      )}
      {!loading && notifications && notifications.length > 0 && (
        <>
          {notifications?.map(notification => (
            <motion.li
              key={notification.uuid}
              className='whitespace-nowrap'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => itemAction(notification)}
                type='button'
                className='relative flex items-center gap-3 data-[active=true]:bg-[--backgroundPrimary] hover:bg-[--buttonHover] px-3 py-2 rounded-xl w-full font-normal whitespace-normal transition-all duration-300'
              >
                {notification.created_at && (
                  <div className='top-0 right-0 absolute flex items-center gap-2 p-2 font-normal text-zinc-500 text-xs'>
                    {formatDistance(notification.created_at)}
                    {notification.status !== 'READ' &&
                    notification.status !== 'REJECTED' &&
                    notification.status !== 'APPROVED'
                      ? true
                      : false && (
                          <div
                            className='bg-[--primaryColor] rounded-full w-2 h-2'
                            aria-hidden='true'
                          ></div>
                        )}
                  </div>
                )}

                <div className='flex flex-col w-full text-left'>
                  <span className='capitalize'>
                    {notification.title.toLocaleLowerCase()}
                  </span>

                  <span
                    className={cn(
                      'font-medium text-[--textSecondary] text-sm text-left line-clamp-1',
                      {
                        'font-normal':
                          notification.status !== 'READ' &&
                          notification.status !== 'REJECTED' &&
                          notification.status !== 'APPROVED'
                            ? true
                            : false === false,
                      }
                    )}
                  >
                    {normalizeDescription(
                      notification.message.toLocaleLowerCase()
                    )}
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </>
      )}
      {!loading && notifications && notifications.length === 0 && (
        <li className='flex justify-center items-center h-10'>
          <span className='text-[--textSecondary] text-sm text-center'>Nenhuma notificação</span>
        </li>
      )}
      {!loading && notifications && notifications.length > 0 && (
        <li className='pt-2'>
          <SubNavLinkAction name='Ver tudo' href='/notificacoes' />
        </li>
      )}
    </ul>
  )
}
