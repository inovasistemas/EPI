'use client'
import { formatDistance } from '@/components/Utils/FormatDistance'
import { normalizeDescription } from '@/components/Utils/NormalizeDescription'
import { getNotifications } from '@/services/Notification'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useEffect, useRef, useState } from 'react'

type Notification = {
  uuid: string
  title: string
  message: string
  status: string
  answered_at: string
  needs_approval: boolean
  approved: boolean
  created_at: string
}

const tabs = ['ALL', 'RECEIVED', 'READ'] as const

const Notification: FC = () => {
  const [filter, setFilter] = useState<'READ' | 'RECEIVED' | 'ALL'>('ALL')
  const tabRefs = useRef<Record<string, HTMLLabelElement | null>>({})
  const [bgStyle, setBgStyle] = useState({ x: 0, width: 0 })
  const [notificationsData, setNotificationsData] = useState<Notification[]>([])

  useEffect(() => {
    const el = tabRefs.current[filter]
    if (el) {
      const { offsetLeft, offsetWidth } = el
      setBgStyle({ x: offsetLeft, width: offsetWidth })
    }
  }, [filter])

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotifications({ status: 'RECEIVED', limit: 3 })
      if (response && response.status === 200) {
        const data = response.data
        if (data.total > 0) {
          setNotificationsData(data.data)
        }
      }
    }

    fetchNotifications()

    const interval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-y-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <h2 className='mt-2 font-medium text-[--textSecondary] text-xl select-none'>
              Notificações
            </h2>
          </div>
          <div className='box-border relative flex items-center gap-0.5 bg-[--backgroundSecondary] p-1 rounded-full'>
            <motion.div
              className='top-0 left-0 z-0 absolute bg-[--primaryColor] mt-1 rounded-full h-10'
              animate={{ x: bgStyle.x, width: bgStyle.width }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            {tabs.map(tab => (
              <label
                key={tab}
                ref={el => {
                  tabRefs.current[tab] = el
                }}
                className='z-10 relative flex items-center gap-2 px-3 py-2 rounded-full h-10 cursor-pointer'
              >
                <input
                  type='radio'
                  name='notificationStatus'
                  value={tab}
                  className='peer !hidden'
                  checked={filter === tab}
                  onChange={() => setFilter(tab)}
                />
                <span className='font-medium text-[--textSecondary] peer-checked:text-white text-sm transition-all duration-300'>
                  {tab === 'ALL'
                    ? 'Todas'
                    : tab === 'RECEIVED'
                      ? 'Não lidas'
                      : 'Lidas'}
                </span>
              </label>
            ))}
          </div>
        </div>
        <AnimatePresence mode='popLayout'>
          <div className='px-6 w-full'>
            <ul className='divide-y divide-[--border] w-full'>
              {notificationsData
                .filter(notification =>
                  filter === 'ALL' ? true : notification.status === filter
                )
                .map(notification => (
                  <motion.li
                    key={notification.uuid}
                    layout
                    className='relative flex flex-row justify-between py-6 w-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => null}
                  >
                    <div
                      className={classNames(
                        {
                          'opacity-60 hover:opacity-100':
                            notification.status === 'READ',
                        },
                        'flex flex-col transition-all duration-300 w-full'
                      )}
                    >
                      <span className='font-medium capitalize'>
                        {notification.title.toLocaleLowerCase()}
                      </span>
                      <span className='font-regular text-sm'>
                        {normalizeDescription(
                          notification.message.toLocaleLowerCase()
                        )}
                      </span>

                      {notification.needs_approval &&
                        !notification.answered_at && (
                          <div className='flex flex-row justify-start gap-3 pt-3 w-full'>
                            <button
                              type='button'
                              className='group relative flex flex-row justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-[--textSecondary] disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                            >
                              <span className='font-medium text-sm'>
                                Recusar
                              </span>
                            </button>
                            <button
                              type='button'
                              className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                            >
                              <span className='font-medium text-sm'>
                                Aprovar
                              </span>
                            </button>
                          </div>
                        )}

                      {notification.needs_approval &&
                        notification.approved !== null && (
                          <div className='flex flex-row justify-start gap-3 pt-3 w-full'>
                            <button
                              disabled
                              type='button'
                              className='group relative flex flex-row justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-[--textSecondary] disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                            >
                              <span className='font-medium text-sm'>
                                {notification.approved
                                  ? 'Aprovado'
                                  : 'Recusado'}
                              </span>
                            </button>
                          </div>
                        )}
                    </div>

                    <span className='top-0 right-0 absolute mt-3 font-regular text-xs'>
                      {formatDistance(notification.created_at)}
                    </span>
                  </motion.li>
                ))}
            </ul>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Notification
