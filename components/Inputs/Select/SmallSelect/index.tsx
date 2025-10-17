'use client'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { CaretDownIcon } from '@/components/Display/Icons/CaretDownIcon'

type SmallSelectOptionsProps = {
  value: string
  label: string
}

type SmallSelectProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: SmallSelectOptionsProps[]
  background?: string
  value?: string
  onChange?: (value: string) => void
}

export function SmallSelect({ name, label, icon, options, value, onChange, background = 'bg-[--backgroundSecondary]' }: SmallSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<SmallSelectOptionsProps | null>(null)
  const [isSelectMenuOpen, setSelectMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (options?.length && value) {
      const matchedOption = options.find(option => option.value === value)
      setSelectedOption(matchedOption ?? null)
    } else {
      setSelectedOption(null)
    }
  }, [options, value])

  if (!isClient) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        [
          background,
          'group flex items-center rounded-xl'
        ]
      )}
    >
      {icon && (
        <span className='top-0 left-0 z-50 absolute flex items-center mr-1 ml-3 h-full'>
          {icon}
        </span>
      )}

      <div className='relative flex items-center w-full'>
        <Select
          value={selectedOption}
          onChange={option => onChange?.(option ? option.value : '')}
          noOptionsMessage={() => ''}
          id={name}
          onMenuOpen={() => setSelectMenuOpen(true)}
          onMenuClose={() => setSelectMenuOpen(false)}
          options={options}
          className='rounded-xl w-full'
          placeholder=''
          menuPlacement='auto'
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            option: (provided, state) => ({
              ...provided,
              padding: '0.5rem',
              paddingLeft: '0.75rem',
              borderRadius: '0.75rem',
              marginTop: '0.5rem',
              color: 'var(--textSecondary)',
              fontSize: '0.875rem',
              backgroundColor: state.isSelected
                ? 'var(--buttonHover)'
                : state.isFocused
                  ? 'var(--backgroundSecondary)'
                  : 'transparent',
              ':hover': {
                backgroundColor: state.isSelected
                  ? state.isFocused
                    ? 'var(--buttonHover)'
                    : 'var(--buttonHover)'
                  : 'var(--buttonHover)',
              },
            }),
            menu: (provided, state) => ({
              ...provided,
              borderRadius: '0.75rem',
              color: '#fff',
              boxShadow:
                '0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              border: '1px solid var(--outlinePrimary)',
              paddingTop: '0',
              paddingBottom: '0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              fontSize: '0.875rem',
              zIndex: 50,
              backgroundColor: 'var(--backgroundSecondary)',
            }),
            control: (provided, state) => ({
              ...provided,
              border: state.isFocused
                ? '0px solid var(--backgroundSecondary)'
                : '0px solid var(--backgroundSecondary)',
              backgroundColor: 'transparent',
              boxShadow: state.isFocused ? '0 0 0 0px #FB923C' : 'none',
              width: '100%',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              paddingLeft: icon ? '2rem' : '0',
            }),
            placeholder: provided => ({
              ...provided,
              color: 'var(--labelPrimary)',
              width: '100%',
              fontSize: '0.875rem',
            }),
            input: provided => ({
              ...provided,
             color: 'var(--textSecondary)',
              fontFamily: 'inherit',
              width: '100%',
              fontSize: '0.875rem',
            }),
            singleValue: provided => ({
              ...provided,
              color: 'var(--textSecondary)',
              fontSize: '1rem',
              textAlign: 'start',
              textTransform: 'capitalize',
              paddingRight: '1.5rem',
              height: '100%',
              alignItems: 'center',
              display: 'flex',
              boxSizing: 'border-box',
            }),
          }}
        />

        <span
          className={cn(
            {
              'rotate-180': isSelectMenuOpen,
            },
            [
              'right-0 absolute flex items-center mr-3 h-full transition-all duration-300',
            ]
          )}
        >
          <CaretDownIcon size='size-5' stroke='stroke-[--textSecondary]' />
        </span>

        <span className='top-0 right-7 z-10 absolute flex items-center px-2 h-full text-zinc-500 text-xs peer-focus:scale-75'>
          {label}
        </span>
      </div>
    </div>
  )
}
