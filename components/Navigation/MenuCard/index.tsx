import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

type MenuCardProps = {
  children: React.ReactNode
  isMenuOpen: boolean
  handleClickOverlay: () => void
  margin: string
  width: string
}

export function MenuCard({
  children,
  isMenuOpen,
  handleClickOverlay,
  margin,
  width,
}: MenuCardProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key='overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className='top-0 left-0 z-[60] fixed w-screen h-screen'
          onClick={handleClickOverlay}
        ></motion.div>
      )}
      {isMenuOpen && (
        <motion.div
          key='menu'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn([
            margin,
            width,
            'top-0 right-0 z-[100] absolute bg-[--backgroundSecondary] shadow-md border border-[--outlinePrimary] rounded-xl max-w-80',
          ])}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
