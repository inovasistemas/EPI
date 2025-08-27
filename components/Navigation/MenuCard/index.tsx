import classNames from 'classnames'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

type MenuCardProps = {
  children: React.ReactNode
  isMenuOpen: boolean
  handleClickOverlay: () => void
  margin: string
  width: string
  zIndex: string
  position?: string
}

export function MenuCard({
  children,
  isMenuOpen,
  handleClickOverlay,
  margin,
  width,
  zIndex,
  position,
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
          className={classNames(zIndex, 'top-0 left-0 fixed w-screen h-screen')}
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
          className={cn(
            {
              'top-0 right-0': !position,
            },
            [
              position,
              margin,
              width,
              ' z-[250] absolute bg-[--backgroundSecondary] shadow-xl border border-[--outlinePrimary] rounded-xl max-w-80',
            ]
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
