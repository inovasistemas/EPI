import { SearchSelect } from '../SearchSelect'
import { useEffect, useRef, useState } from 'react'
import { getManufacturers } from '@/services/Manufacturer'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { SelectManufacturersProps } from './types'

export function SelectManufacturers({
  value,
  onChange,
}: SelectManufacturersProps) {
  const fetchedManufacturers = useRef(false)
  const [ManufacturersData, setManufacturersData] = useState([
    {
      uuid: '',
      name: '',
      active_equipments: '',
      created_at: '',
      updated_at: '',
    },
  ])

  const fetchManufacturers = async () => {
    const response = await getManufacturers()

    if (response && response.status === 200) {
      setManufacturersData(response.data.data)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os fabricantes' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedManufacturers.current) return
    fetchedManufacturers.current = true
    fetchManufacturers()
  }, [])

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
