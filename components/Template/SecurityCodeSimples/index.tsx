import { useRef, useState } from 'react'

type SecurityCodeSimpleType = {
  onChange: (value: string) => void
}

export function SecurityCodeSimple({ onChange }: SecurityCodeSimpleType) {
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
      <div className='flex justify-center gap-3 w-full'>
        {values.map((val, i) => (
          <input
            // biome-ignore lint/suspicious/noArrayIndexKey: need this key to be the index
            key={i}
            ref={el => setInputRef(i, el)}
            type='number'
            inputMode='numeric'
            maxLength={1}
            className='flex bg-[--backgroundSecondary] border-2 focus:border-[--primaryColor] border-transparent rounded-xl outline-none w-14 h-14 font-medium text-xl text-center uppercase transition-all duration-300 select-none'
            value={val}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    </div>
  )
}
