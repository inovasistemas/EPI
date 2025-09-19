'use client'
import { FingerPrintIcon } from '@/components/Display/Icons/FingerPrint'
import { Modal } from '@/components/Display/Modal'
import WebcamCapture from '@/components/FaceRecognition'
import { useRef, useState } from 'react'

type TakeoutModalProps = {
  title: string
  isModalOpen: boolean
  handleClickOverlay: () => void
}

export function TakeoutModal({
  title,
  isModalOpen,
  handleClickOverlay,
}: TakeoutModalProps) {
  const webcamRef = useRef<any>(null)

  const handleBeforeClose = () => {
    if (webcamRef.current?.stopWebcam) {
      webcamRef.current.stopWebcam()
    }
    handleClickOverlay()
  }

  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      handleClickOverlay={handleBeforeClose}
      showClose={false}
      padding={false}
    >
      <div className='flex flex-col justify-center items-center gap-3 pt-6 w-full'>
        <h2 className='font-medium text-xl leading-none'>
          Reconhecimento facial
        </h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Vamos utilizar uma ferramenta de reconhecimento facial para
            confirmação da identidade.
          </span>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Garanta que o rosto esteja iluminado, retire máscaras e óculos
            escuros.
          </span>
        </div>
      </div>

      <WebcamCapture ref={webcamRef} />
    </Modal>
  )
}
