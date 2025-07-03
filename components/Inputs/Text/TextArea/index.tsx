'use client'
import { useState } from 'react'

type TextAreaProps = {
  name: string
  label?: string
  required: boolean
}

export function TextArea({ name, label, required = false }: TextAreaProps) {
  const [text, setText] = useState('')

  return (
    <div className='group relative flex items-center bg-white border border-[#D9D9D9] rounded-md h-full'>
      <div className='relative flex items-center w-full h-full'>
        <textarea
          id={name}
          name={name}
          className='peer block bg-transparent px-[12px] pt-[23px] pb-[7px] rounded focus:outline-none w-full h-full font-normal text-zinc-900 text-sm appearance-none resize-none'
          placeholder=' '
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <label
          htmlFor={name}
          className='top-2 peer-focus:top-2 peer-placeholder-shown:top-1/4 left-1 z-10 absolute bg-white px-2 peer-focus:px-2 text-zinc-500 text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-1.5 peer-focus:-translate-y-1.5 peer-placeholder-shown:-translate-y-1/2 duration-300 transform'
        >
          {label}
        </label>
        {required && (
          <label
            htmlFor={name}
            className='hidden peer-focus:hidden peer-placeholder-shown:block top-2 right-1 z-10 absolute px-2 text-red-500 text-sm duration-300'
          >
            *
          </label>
        )}
      </div>
    </div>
  )
}
