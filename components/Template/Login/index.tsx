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
      <div className='gap-6 grid sm:grid-cols-2 p-4 w-full h-full'>
        <div className='hidden sm:flex justify-center items-center bg-[--backgroundSecondary] bg-cover bg-no-repeat bg-center'></div>
        <div className='relative flex justify-center items-center bg-[--backgroundPrimary] rounded-xl w-full h-full'>
          <LoginForm />
          <div className='bottom-0 absolute flex justify-center items-center gap-2 mb-6 p-3 w-full text-[--textSecondary] text-xs'>
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
