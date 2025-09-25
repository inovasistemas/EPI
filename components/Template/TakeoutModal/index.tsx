'use client'
import { Countdown } from '@/components/Countdown'
import { FingerPrintIcon } from '@/components/Display/Icons/FingerPrint'
import { LockIcon } from '@/components/Display/Icons/Lock'
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

  const uuid = (prefix: string) => {
    const randomHex = Array(16)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    return `${prefix}_${randomHex}`;
  }


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
      <div className='flex flex-col justify-center items-center gap-6 pt-6 w-full min-h-96'>
        <div className='flex flex-row items-center gap-2 -mt-10'>
          <LockIcon size="min-w-[1.5rem] size-5" stroke="stroke-[--textSecondary]" />
          <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
            Reconhecimento facial
          </h2>
        </div>
        <div className='flex justify-center items-center w-full h-full'>
          <Countdown date='2025-10-15 00:00:00' />
          {/* {uuid('sc')} */}
        </div>
        
        {/* 
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Vamos utilizar uma ferramenta de reconhecimento facial para
            confirmação da identidade.
          </span>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Garanta que o rosto esteja iluminado, retire máscaras e óculos
            escuros.
          </span>
        </div> */}
      </div>

      {/* <WebcamCapture ref={webcamRef} /> */}
    </Modal>
  )
}
