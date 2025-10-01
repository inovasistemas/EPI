import { motion } from 'framer-motion'

type PrimaryButtonProps = {
  name: string
  action: () => void
  text: string
  type: 'button' | 'submit' | 'reset'
  disabled: boolean
  icon?: React.ReactElement | null
}

export function PrimaryButton({
  name,
  action,
  text,
  type,
  disabled,
  icon
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      name={name}
      onClick={action}
      type={type}
      className='relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-8 py-2.5 rounded-xl w-full font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
    >
        {!icon && (
          <motion.span
          key="button-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
      {icon && (
        <motion.div
          key="button-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='flex flex-col gap-3 py-0.5'
        >
          {icon}
        </motion.div>
        )}
    </button>
  )
}
