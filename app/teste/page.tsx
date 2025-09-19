'use client'
import WebcamCapture from '@/components/FaceRecognition'
import { type FC } from 'react'

const Teste: FC = () => {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto scroll-smooth'>
        {/* <WebcamCapture /> */}
      </div>
    </div>
  )
}

export default Teste
