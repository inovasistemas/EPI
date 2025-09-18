import { SearchSelect } from '../SearchSelect'
import { useEffect, useRef, useState } from 'react'
import { getCategories } from '@/services/Category'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { SelectCategoriesProps } from './types'

export function SelectCategories({ value, onChange }: SelectCategoriesProps) {
  const fetchedCategories = useRef(false)
  const [CategoriesData, setCategoriesData] = useState([
    {
      uuid: '',
      name: '',
      sector: '',
      created_at: '',
      updated_at: '',
      subcategories: [
        {
          uuid: '',
          name: '',
          active_equipments: '',
          created_at: '',
          updated_at: '',
        },
      ],
    },
  ])

  const fetchCategories = async () => {
    const response = await getCategories()

    if (response && response.status === 200) {
      setCategoriesData(response.data.data)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar as categorias' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedCategories.current) return
    fetchedCategories.current = true
    fetchCategories()
  }, [])

  return (
    <SearchSelect
      value={value}
      name='category'
      options={
        CategoriesData
          ? CategoriesData.flatMap(category => [
              { value: category.uuid, label: category.name },
              ...(category.subcategories?.map(sub => ({
                value: sub.uuid,
                label: sub.name,
              })) ?? []),
            ])
          : []
      }
      placeholder='Categoria'
      onChange={onChange}
    />
  )
}
