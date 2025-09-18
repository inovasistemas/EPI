import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '@/components/Display/Icons/Close'

type ModalProps = {
  title: string
  isModalOpen: boolean
  handleClickOverlay: () => void
  children: React.ReactNode
  titleFixed?: boolean
  size?: string
  overflow?: boolean
  showClose?: boolean
  padding?: boolean
}

export function Modal({
  title,
  isModalOpen,
  handleClickOverlay,
  children,
  titleFixed = false,
  size = 'default',
  overflow = false,
  showClose = true,
  padding = true,
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
  })

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className='top-0 left-0 z-[205] fixed w-full h-full'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClickOverlay}
            className='top-0 left-0 z-[60] fixed flex justify-center items-center bg-black/30 w-screen h-screen pointer-events-auto'
          >
            <motion.div
              initial={{ y: '10%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '10%', opacity: 0 }}
              onClick={e => e.stopPropagation()}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={classNames(
                'z-[900] absolute flex flex-col border border-[--outlinePrimary] bg-[--backgroundPrimary] shadow-xl mx-auto rounded-xl max-h-[80%] sm:max-h-[75%] text-[--textSecondary]',
                {
                  'min-w-[50%] max-w-[90%] sm:max-w-[75%]': size === 'default',
                  'min-w-[50%] max-w-[50%] sm:max-w-[35%]': size === 'small',
                  'max-w-[40%]': size === 'extra-small',
                  'overflow-y-auto': overflow,
                }
              )}
            >
              <div
                className={`py-2 flex justify-center items-center bg-transparent rounded-t-xl w-full transition-all duration-300 border-b-[1.5px] border-transparent ${titleFixed ? 'absolute left-0 top-0' : ''} ${hasScrolled ? 'shadow-lg' : ''}`}
              >
                <h2
                  className={`font-semibold text-lg text-center transition-all duration-300 ${hasScrolled ? ' !opacity-100' : 'opacity-0'}`}
                >
                  {title}
                </h2>
                {showClose && (
                  <button
                    type='button'
                    onClick={handleClickOverlay}
                    className='group right-0 z-[999] absolute flex justify-center items-center rounded-full min-w-10 min-h-10 transition-all duration-300'
                  >
                    <CloseIcon
                      size='size-4'
                      stroke='stroke-[--textSecondary]'
                      strokeWidth={2.5}
                    />
                  </button>
                )}
              </div>
              <div
                ref={divRef}
                className={classNames(
                  { 'overflow-y-auto': size === 'default' },
                  { 'p-6': padding },
                  'w-full h-full'
                )}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
