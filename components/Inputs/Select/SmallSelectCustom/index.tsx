'use client'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { CaretDownIcon } from '@/components/Display/Icons/CaretDownIcon'

type SmallSelectCustomOptionsProps = {
  value: string
  label: string
}

type SmallSelectCustomProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: SmallSelectCustomOptionsProps[]
  selectedIndex?: number
}

export function SmallSelectCustom({
  name,
  label,
  icon,
  options,
  selectedIndex = 0,
}: SmallSelectCustomProps) {
  const [selectedOption, setSelectedOption] =
    useState<SmallSelectCustomOptionsProps | null>(null)
  const [isSelectMenuOpen, setSelectMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (options?.length) {
      setSelectedOption(options[selectedIndex])
    } else {
      setSelectedOption(null)
    }
  }, [options, selectedIndex])

  if (!isClient) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        ['group flex items-center bg-zinc-100 rounded-xl']
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
          onChange={setSelectedOption}
          noOptionsMessage={() => ''}
          id={name}
          onMenuOpen={() => setSelectMenuOpen(true)}
          onMenuClose={() => setSelectMenuOpen(false)}
          options={options}
          className='rounded-xl w-full text-sm'
          placeholder=''
          menuPlacement='auto'
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          isSearchable={false}
          styles={{
            option: (provided, state) => ({
              ...provided,
              padding: '0.5rem',
              paddingLeft: '0.75rem',
              borderRadius: '0.75rem',
              marginTop: '0.5rem',
              color: 'black',
              fontSize: '0.875rem',
              backgroundColor: state.isSelected
                ? '#f3f4f6'
                : state.isFocused
                  ? '#fff'
                  : 'transparent',
              ':hover': {
                backgroundColor: state.isSelected
                  ? state.isFocused
                    ? '#e5e7eb'
                    : '#f3f4f6'
                  : '#f3f4f6',
              },
            }),
            menu: (provided, state) => ({
              ...provided,
              borderRadius: '0.75rem',
              boxShadow: 'none',
              border: '1px solid #D9D9D9',
              paddingTop: '0',
              paddingBottom: '0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              fontSize: '0.875rem',
              zIndex: 50,
            }),
            control: (provided, state) => ({
              ...provided,
              border: state.isFocused ? '0px solid #fff' : '0px solid #fff',
              backgroundColor: state.isFocused ? '#E9E9EC' : 'transparent',
              boxShadow: state.isFocused ? '0 0 0 0px #FB923C' : 'none',
              width: '100%',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              paddingLeft: icon ? '1.675rem' : '0',
            }),
            placeholder: provided => ({
              ...provided,
              color: '#4B5563',
              width: '100%',
              fontSize: '0.875rem',
            }),
            input: provided => ({
              ...provided,
              color: 'inherit',
              fontFamily: 'inherit',
              width: '100%',
              fontSize: '0.875rem',
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
