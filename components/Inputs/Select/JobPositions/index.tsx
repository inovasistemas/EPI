import { SearchSelect } from '../SearchSelect'
import { SelectJobPositionsProps } from '@/components/Inputs/Select/JobPositions/types'
import { useEffect, useRef, useState } from 'react'
import { getJobPositions } from '@/services/JobPosition'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'

export function SelectJobPositions({
  value,
  onChange,
  jobPositionsData
}: SelectJobPositionsProps) {
  return (
    <SearchSelect
      value={value}
      name='jobPosition'
      options={
        jobPositionsData
          ? jobPositionsData.map(jobPosition => ({
              value: jobPosition.uuid,
              label: jobPosition.name,
            }))
          : []
      }
      placeholder='Cargo'
      onChange={onChange}
    />
  )
}
