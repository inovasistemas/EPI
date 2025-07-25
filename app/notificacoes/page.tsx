'use client'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useState } from 'react'

type Notification = {
  id: string
  title: string
  description: string
  read: boolean
  accepted: boolean
  createdAt: string
}

const Notification: FC = () => {
  const [filter, setFilter] = useState(false)
  const notificationData: Notification[] = [
    {
      id: '1',
      title: 'Teste 1',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, modi pariatur. Exercitationem vitae et quidem. Illo corporis non qui quibusdam esse ullam, itaque officiis? Quaerat eos esse doloremque dicta veniam.',
      read: false,
      accepted: false,
      createdAt: '25m',
    },
    {
      id: '2',
      title: 'Teste 2',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, modi pariatur. Exercitationem vitae et quidem. Illo corporis non qui quibusdam esse ullam, itaque officiis? Quaerat eos esse doloremque dicta veniam.',
      read: false,
      accepted: false,
      createdAt: '1d',
    },
    {
      id: '3',
      title: 'Teste 3',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, modi pariatur. Exercitationem vitae et quidem. Illo corporis non qui quibusdam esse ullam, itaque officiis? Quaerat eos esse doloremque dicta veniam.',
      read: true,
      accepted: true,
      createdAt: '3d',
    },
  ]

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-y-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <h2 className='mt-2 font-medium text-[--textSecondary] text-xl select-none'>
              Notificações
            </h2>
          </div>
          <div className='flex items-center gap-0.5 bg-[--backgroundSecondary] p-1 rounded-full'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='notificationStatus'
                value='unread'
                className='peer !hidden'
                checked={filter === false}
                onChange={() => setFilter(false)}
              />
              <span className='flex items-center bg-[--backgroundSecondary] peer-checked:bg-[--primaryColor] px-4 py-2 rounded-full h-10 font-medium text-[--textSecondary] peer-checked:text-white text-sm transition-all duration-300'>
                Não lidas
              </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                name='notificationStatus'
                value='read'
                className='peer !hidden'
                checked={filter === true}
                onChange={() => setFilter(true)}
              />
              <span className='flex items-center bg-[--backgroundSecondary] peer-checked:bg-[--primaryColor] px-4 py-2 rounded-full h-10 font-medium text-[--textSecondary] peer-checked:text-white text-sm transition-all duration-300'>
                Lidas
              </span>
            </label>
          </div>
        </div>
        <AnimatePresence>
          <div className='px-6 w-full'>
            <ul className='divide-y divide-[--border] w-full'>
              {notificationData
                .filter(notification =>
                  filter === true ? notification.read : !notification.read
                )
                .map(notification => (
                  <motion.li
                    key={notification.id}
                    className='relative flex flex-row justify-between py-6 w-full'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => null}
                  >
                    <div
                      className={classNames(
                        {
                          'opacity-60 hover:opacity-100': notification.read,
                        },
                        'flex flex-col transition-all duration-300 w-full'
                      )}
                    >
                      <span className='font-medium'>{notification.title}</span>
                      <span className='font-regular text-sm'>
                        {notification.description}
                      </span>

                      {!notification.accepted && (
                        <div className='flex flex-row justify-start gap-3 pt-3 w-full'>
                          <button
                            type='button'
                            className='group relative flex flex-row justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-[--textSecondary] disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                          >
                            <span className='font-medium text-sm'>Recusar</span>
                          </button>
                          <button
                            type='button'
                            className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                          >
                            <span className='font-medium text-sm'>Aprovar</span>
                          </button>
                        </div>
                      )}

                      {notification.accepted && (
                        <div className='flex flex-row justify-start gap-3 pt-3 w-full'>
                          <button
                            disabled
                            type='button'
                            className='group relative flex flex-row justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-[--textSecondary] disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
                          >
                            <span className='font-medium text-sm'>Aceito</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <span className='top-0 right-0 absolute mt-3 font-regular text-xs'>
                      {notification.createdAt}
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
