'use client'
import { type FC, useCallback, useState } from 'react'
import { LockIcon } from '@/components/Display/Icons/Lock'
import { Modal } from '@/components/Display/Modal'
import { LoginForm } from '@/components/Template/LoginForm'
import { Privacy } from '../Terms/Privacy'

const Login: FC = () => {
  const [modalStatus, setModalStatus] = useState(false)

  const handleClickOverlay = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  return (
    <div className='relative bg-[--backgroundSecondary] w-full h-screen overflow-auto'>
      <Modal
        title='Política de Privacidade'
        isModalOpen={modalStatus}
        handleClickOverlay={handleClickOverlay}
      >
        <Privacy />
      </Modal>
      <div className='flex justify-center gap-6 p-4 w-full h-full'>
        <div className='flex flex-col justify-center items-center gap-3 rounded-xl w-full h-full'>
          <div className='flex justify-center items-center bg-[--backgroundPrimary] rounded-3xl w-full sm:w-[52%] sm:min-w-[650px] h-full'>
            <LoginForm />
          </div>
          <div className='flex justify-center items-center gap-2 p-3 w-full text-[--textSecondary] text-xs'>
            <LockIcon
              size='size-3'
              stroke='stroke-[--textSecondary]'
              strokeWidth={2.5}
            />

            <p>
              Ao fazer login, você concorda com nossa{' '}
              <button
                type='button'
                className='font-medium text-[--textPrimary] hover:text-[--secondaryColor] active:scale-95 transition-all duration-300'
                onClick={handleClickOverlay}
              >
                Política de Privacidade
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
