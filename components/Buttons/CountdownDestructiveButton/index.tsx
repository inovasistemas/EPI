import { TrashIcon } from '@/components/Display/Icons/Trash'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

export function CountdownDestructiveButton() {
  const [isPrompted, setIsPrompted] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef<number | null>(null)
  const resetPromptTimerRef = useRef<number | null>(null)

  const handleMouseDown = () => {
    if (resetPromptTimerRef.current !== null) {
      clearTimeout(resetPromptTimerRef.current)
      resetPromptTimerRef.current = null
    }

    if (!isPrompted) {
      setIsPrompted(true)
      return
    }

    if (!isPressing) {
      setIsPressing(true)
      setCountdown(5)
      timerRef.current = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (timerRef.current !== null) clearInterval(timerRef.current)
            setIsPressing(false)
            setIsPrompted(false)
            alert('excluir')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleMouseUpOrLeave = () => {
    if (isPressing) {
      setIsPressing(false)
      setCountdown(5)
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    if (isPrompted && resetPromptTimerRef.current === null) {
      resetPromptTimerRef.current = window.setTimeout(() => {
        setIsPrompted(false)
        resetPromptTimerRef.current = null
      }, 3000)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
      if (resetPromptTimerRef.current !== null)
        clearTimeout(resetPromptTimerRef.current)
    }
  }, [])

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUpOrLeave}
      onTouchCancel={handleMouseUpOrLeave}
      type='button'
      className={cn(
        {
          '!bg-[--errorLoader] transition-all duration-300': isPrompted,
        },
        'group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
      )}
    >
      <TrashIcon
        size='size-4'
        stroke={cn(
          { '!stroke-white': isPrompted },
          'stroke-[--textSecondary] group-hover:stroke-white'
        )}
        strokeWidth={2.5}
      />

      <motion.span
        animate={{ width: !isPrompted ? '6ch' : '31ch' }}
        initial={false}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          { '!text-white': isPrompted },
          'text-nowrap overflow-hidden font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'
        )}
      >
        {!isPrompted && 'Excluir'}
        {isPrompted && !isPressing && 'Pressione por 5 segundos para excluir'}
        {isPrompted &&
          isPressing &&
          `Pressione por ${countdown} segundo${countdown > 1 ? 's' : ''} para excluir`}
      </motion.span>
    </button>
  )
}
