import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

interface GroupLabelProps {
  isVisible: boolean
  label: string
  showFixed: boolean
}

export function GroupLabel({ isVisible, label, showFixed }: GroupLabelProps) {
  return (
    <AnimatePresence>
      {(showFixed || isVisible) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='hidden sm:block top-0 left-0 absolute px-1 font-semibold text-[--labelPrimary] text-[10px] transition-all duration-150'
        >
          <span className='uppercase'>{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
