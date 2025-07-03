'use client'
import { CarretDownIcon } from '@/components/Display/Icons/CarretDown'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import cn from 'classnames'

type SearchSelectOptionsProps = {
  value: string
  label: string
}

type SearchSelectProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: SearchSelectOptionsProps[]
}

export function SearchSelect({
  name,
  label,
  icon,
  options,
}: SearchSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<SearchSelectOptionsProps | null>(null)
  const [isSelectMenuOpen, setSelectMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (options?.length) {
      setSelectedOption(options[0])
    } else {
      setSelectedOption(null)
    }
  }, [options])

  if (!isClient) {
    return null
  }

  if (label) {
  }

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        ['group flex items-center bg-white border border-[#D9D9D9] rounded-md']
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
          className={cn(
            {
              'mt-4 ': label,
            },
            ['rounded-md w-full']
          )}
          placeholder=''
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            option: (provided, state) => ({
              ...provided,
              padding: '0.5rem',
              paddingLeft: '0.75rem',
              borderRadius: '0.375rem',
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
              borderRadius: '0.375rem',
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
              backgroundColor: state.isFocused ? '#fff' : 'transparent',
              boxShadow: state.isFocused ? '0 0 0 0px #FB923C' : 'none',
              width: '100%',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              paddingLeft: icon ? '2rem' : '0',
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
          <CarretDownIcon />
        </span>

        {label && (
          <label
            htmlFor={name}
            className={cn(
              {
                'left-9': icon,
                'left-1': !icon,
              },
              [
                'peer-focus:px-2 peer-focus:top-2 peer-placeholder-shown:top-1/2 top-2 z-10 absolute bg-white px-2 text-zinc-500 text-base scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] -translate-y-1.5 peer-focus:-translate-y-1.5 peer-placeholder-shown:-translate-y-1/2 duration-300 transform',
              ]
            )}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  )
}
