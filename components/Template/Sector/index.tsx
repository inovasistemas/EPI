import { useState } from 'react'
import { FormInput } from '@/components/Inputs/Text/FormInput'

export function Sector() {
  const [sectorData, setSectorData] = useState({
    name: '',
    parent: '',
  })

  const handleChange = (name: string, value: string) => {
    const newData = {
      ...sectorData,
      [name]: value,
    }

    setSectorData(newData)
  }

  return (
    <div>
      <div className='select-none'>
        <div className='gap-3 grid grid-cols-2 h-full'></div>
      </div>
    </div>
  )
}
