'use client'
import { useState } from 'react'

type SearchInputProps = {
  name: string
  label?: string
  required: boolean
  icon?: React.ReactElement
  filter?: React.ReactElement
}

export function SearchInput({
  name,
  label,
  required = false,
  icon,
  filter,
}: SearchInputProps) {
  const [text, setText] = useState('')

  return (
    <div className='group relative flex items-center bg-white border border-[#E5E5E5] rounded-xl'>
      {icon && <span className='ml-3'>{icon}</span>}

      <div className='relative flex items-center pr-1.5 w-full'>
        <input
          id={name}
          type='text'
          name={name}
          className='peer block bg-transparent px-[12px] py-2.5 rounded focus:outline-none w-full font-normal text-zinc-900 text-sm appearance-none'
          placeholder=' '
          value={text}
          onChange={e => setText(e.target.value)}
        />

        {filter && <div>{filter}</div>}
      </div>
    </div>
  )
}
