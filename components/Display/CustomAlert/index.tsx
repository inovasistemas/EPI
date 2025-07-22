'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type CustomAlertProps = {
  text: string
  link?: string
  state: boolean
  action: () => void
}

export function CustomAlert({ text, state, action }: CustomAlertProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    action()
  }

  useEffect(() => {
    if (!state) return

    timeoutRef.current = setTimeout(() => {
      action()
    }, 10000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state, action])

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className='group top-0 right-0 z-50 absolute flex flex-col items-center gap-3 bg-[--buttonPrimary] m-3 rounded-xl w-auto max-w-[75%] overflow-hidden text-[--textSecondary] text-sm'
    >
      <div className='relative w-full'>
        <div className='flex flex-row justify-start items-center gap-3 px-4 py-3 pr-5'>
          <span>{text}</span>
        </div>

        <div className='relative w-full'>
          <div className='bottom-0 left-0 absolute bg-[--errorSecondary] w-full h-0.5'></div>
          <motion.div
            key={text}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 10 }}
            className='bottom-0 left-0 absolute bg-[--errorLoader] w-full h-0.5'
          ></motion.div>
        </div>
      </div>
    </motion.button>
  )
}
