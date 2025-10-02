import { SearchSelect } from '../SearchSelect'
import { useEffect, useRef, useState } from 'react'
import { getCategories } from '@/services/Category'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { SelectCategoriesProps } from './types'

export function SelectCategories({ value, onChange, CategoriesData }: SelectCategoriesProps) {
  

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
