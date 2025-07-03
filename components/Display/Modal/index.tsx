import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon } from '../Icons/Close'
import { useState, useRef, useEffect } from 'react'
import { Circle, X, XCircle } from '@phosphor-icons/react'

type ModalProps = {
  title: string
  isModalOpen: boolean
  handleClickOverlay: () => void
  children: React.ReactNode
  titleFixed?: boolean
}

export function Modal({
  title,
  isModalOpen,
  handleClickOverlay,
  children,
  titleFixed = false,
}: ModalProps) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const divElement = divRef.current

    if (!divElement) return

    const handleScroll = () => {
      setHasScrolled(divElement.scrollTop > 50)
    }

    handleScroll()

    divElement.addEventListener('scroll', handleScroll)

    return () => {
      divElement.removeEventListener('scroll', handleScroll)
    }
  }, [isModalOpen])

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className='top-0 left-0 z-[201] fixed w-full h-full'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClickOverlay}
            className='top-0 left-0 z-[60] fixed bg-black/30 w-screen h-screen'
          />
          <motion.div
            initial={{ y: '-40%', opacity: 0 }}
            animate={{ y: '-50%', opacity: 1 }}
            exit={{ y: '-40%', opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='top-1/2 z-[100] relative flex flex-col bg-[--backgroundPrimary] shadow-xl mx-auto rounded-xl min-w-[50%] max-w-[90%] sm:max-w-[75%] max-h-[80%] sm:max-h-[75%] text-[--textSecondary] -translate-y-1/2'
          >
            <div
              className={`py-2 flex justify-center items-center bg-transparent rounded-t-xl w-full transition-all duration-300 border-b-[1.5px] border-transparent ${titleFixed ? 'absolute left-0 top-0' : ''} ${hasScrolled ? 'shadow-lg' : ''}`}
            >
              <h2
                className={`font-semibold text-lg text-center transition-all duration-300 ${hasScrolled ? ' !opacity-100' : 'opacity-0'}`}
              >
                {title}
              </h2>
              <button
                onClick={handleClickOverlay}
                className='group right-0 z-[202] absolute flex justify-center items-center rounded-full min-w-10 min-h-10 transition-all duration-300'
              >
                <X
                  size={20}
                  weight='bold'
                  className='absolute group-hover:opacity-80 text-[--textSecondary] scale-125 sm:scale-100 transition-all duration-300'
                />
              </button>
            </div>
            <div
              ref={divRef}
              className='p-6 pt-6 w-full h-full overflow-y-auto'
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
