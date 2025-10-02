import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

type SecurityCodeType = {
  buttonLabel: string
  onSuccess: () => void
  onChange: (value: string) => void
  icon?: React.ReactElement | null
}

export function SecurityCode({
  buttonLabel,
  onSuccess,
  onChange,
  icon
}: SecurityCodeType) {
  const length = 6
  const [values, setValues] = useState(Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)
    onChange(newValues.join(''))
    if (value) {
      const next = index + 1
      if (next < length) {
        setTimeout(() => inputsRef.current[next]?.focus(), 0)
      }
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      const newValues = [...values]
      if (values[index]) {
        newValues[index] = ''
        setValues(newValues)
        onChange(newValues.join(''))
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
        const prevValues = [...values]
        prevValues[index - 1] = ''
        setValues(prevValues)
        onChange(newValues.join(''))
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').slice(0, length)
    const newValues = Array(length).fill('')
    for (let i = 0, j = 0; i < paste.length && j < length; i++) {
      if (/^[0-9a-zA-Z]$/.test(paste[i])) {
        newValues[j] = paste[i]
        j++
      }
    }
    setValues(newValues)
    onChange(newValues.join(''))
    const nextIndex = newValues.findIndex(v => v === '')
    inputsRef.current[nextIndex === -1 ? length - 1 : nextIndex]?.focus()
  }

  const setInputRef = (index: number, element: HTMLInputElement | null) => {
    inputsRef.current[index] = element
  }

  return (
    <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
      <div className='flex flex-col items-center gap-3'>
        <h2 className='font-medium text-xl leading-none'>
          Código de verificação
        </h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Insira o código de 6 dígitos que você vê no seu aplicativo autenticador
          </span>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Essa etapa ajuda a manter sua conta segura.
          </span>
        </div>
      </div>
      <div className='gap-3 grid grid-cols-6 w-full'>
        {values.map((val, i) => (
          <input
            // biome-ignore lint/suspicious/noArrayIndexKey: need this key to be the index
            key={i}
            ref={el => setInputRef(i, el)}
            type='text'
            inputMode='numeric'
            maxLength={1}
            className='bg-[--backgroundSecondary] border-2 focus:border-[--primaryColor] border-transparent rounded-xl outline-none w-full aspect-square font-medium text-xl text-center uppercase transition-all duration-300 select-none'
            value={val}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className='flex flex-row justify-end mt-3 w-full'>
        <div className='flex flex-row gap-3 w-full sm:max-w-36'>
          <button
            onClick={onSuccess}
            type='button'
            className='relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-8 py-2.5 rounded-xl w-full font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          >
            <AnimatePresence mode='wait'>
              {!icon && (
                <motion.span
                key="button-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='font-medium text-sm'
              >
                {buttonLabel}
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
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  )
}
