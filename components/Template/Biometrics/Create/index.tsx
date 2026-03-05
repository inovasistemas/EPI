'use client'
import { FingerPrintAnimationIcon } from '@/components/Display/Icons/FingerPrintAnimation'
import { Modal } from '@/components/Display/Modal'
import { PrimaryButton } from '@/components/Inputs/Button/Primary'
import { collaboratorBiometrics } from '@/services/Collaborator'
import { EnrollBiometrics } from '@/services/iDBio'
import { useState } from 'react'
import { toast } from 'sonner'
import { ToastError } from '../../Toast/Error'
import { ToastSuccess } from '../../Toast/Success'

type BiometricsCreateProps = {
  collaboratorUUID: string
  collaborator: string
  title: string
  isModalOpen: boolean
  biometricsCollected: () => void
  handleClickOverlay: () => void
}

export function BiometricsCreate({
  collaboratorUUID,
  collaborator,
  title,
  isModalOpen,
  handleClickOverlay,
  biometricsCollected
}: BiometricsCreateProps) {
  const [loading, setLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const handleCreateBiometrics = async (id: string) => {
    setHasStarted(true)
    const response = await EnrollBiometrics({ id, loading: setLoading })

    if (response) {
      if (response.status === 200 || response.status === 201) {
        const responseCreate = await collaboratorBiometrics({
          id,
          uuid: collaboratorUUID || '',
          loading: setLoading,
          biometrics: '',
          message: response.data.message,
          status: 'successful'
        })

        if (!responseCreate || responseCreate.status !== 201) {
          setHasStarted(false)
          toast.custom(() => (
            <ToastError text='Não foi possível cadastrar a biometria' />
          ))
        } else {
          setHasStarted(false)
          biometricsCollected()
          toast.custom(() => (
            <ToastSuccess text='Biometria cadastrada com sucesso' />
          ))
        }
        handleClickOverlay()
      } else {
        setHasStarted(false)
        toast.custom(() => (
          <ToastError text='Não foi possível cadastrar a biometria' />
        ))
      }
    } else {
      setHasStarted(false)
      toast.custom(() => (
        <ToastError text='Não foi possível cadastrar a biometria' />
      ))
    }
  }

  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      handleClickOverlay={handleClickOverlay}
      showClose={false}
      padding={false}
    >
      <div className='flex flex-col justify-center items-center gap-6 pt-6 w-full'>
        <div className='flex flex-row items-center gap-2'>
          <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
            Cadastrar Biometria
          </h2>
        </div>

        <div className='flex flex-col'>
          <p className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Peça ao colaborador para posicionar o dedo indicador da mão direita,
          </p>
          <p className='opacity-60 text-[--textSecondary] text-sm text-center'>
            posicionando novamente o dedo <span className='font-semibold'>3 vezes</span> para completar a captura da digital.
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center py-6 w-full'>
        <FingerPrintAnimationIcon size="w-40 h-40" progress={0} strokeWidth={1.2} started={hasStarted} />
      </div>

      <div className='flex justify-center items-center pb-8'>
        <div className='max-w-48 scale-95'>
          <PrimaryButton name='capture' action={() => handleCreateBiometrics(collaborator)} text='Iniciar captura' type='button' disabled={hasStarted} />
        </div>
      </div>
    </Modal>
  )
}
