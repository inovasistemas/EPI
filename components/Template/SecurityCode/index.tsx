import { useRef, useState } from 'react'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'

export function SecurityCode() {
  const length = 6
  const [values, setValues] = useState(Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)
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
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
        const prevValues = [...values]
        prevValues[index - 1] = ''
        setValues(prevValues)
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
            Insira o código que foi enviado para confirmar sua identidade e
            continuar.
          </span>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Essa etapa ajuda a manter sua conta segura.
          </span>
        </div>
      </div>
      <div className='flex flex-row gap-3'>
        {values.map((val, i) => (
          <input
            // biome-ignore lint/suspicious/noArrayIndexKey: need this key to be the index
            key={i}
            ref={el => setInputRef(i, el)}
            type='text'
            inputMode='numeric'
            maxLength={1}
            className='flex bg-[--backgroundSecondary] rounded-xl w-14 h-14 font-medium text-xl text-center uppercase select-none'
            value={val}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <div className='flex flex-row justify-end mt-6 w-full'>
        <div className='flex flex-row gap-3'>
          <button
            type='button'
            className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          >
            <span className='font-medium text-sm'>Verificar código</span>
          </button>
        </div>
      </div>
    </div>
  )
}
