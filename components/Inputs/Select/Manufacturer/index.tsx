import { SearchSelect } from '../SearchSelect'
import { useEffect, useRef, useState } from 'react'
import { getManufacturers } from '@/services/Manufacturer'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { SelectManufacturersProps } from './types'

export function SelectManufacturers({
  value,
  onChange,
  ManufacturersData
}: SelectManufacturersProps) {
  return (
    <SearchSelect
      value={value}
      name='manufacturer'
      options={
        ManufacturersData
          ? ManufacturersData.flatMap(manufacturer => [
              { value: manufacturer.uuid, label: manufacturer.name },
            ])
          : []
      }
      placeholder='Fabricantes'
      onChange={onChange}
    />
  )
}
