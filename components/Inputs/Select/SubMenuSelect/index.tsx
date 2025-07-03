'use client'
import { CarretDownIcon } from '@/components/Display/Icons/CarretDown'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import cn from 'classnames'
import useAparence from '@/lib/context/aparence'

type SubMenuSelectOptionsProps = {
  value: string
  label: string
}

type SubMenuSelectProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: SubMenuSelectOptionsProps[]
}

export function SubMenuSelect({
  name,
  label,
  icon,
  options,
}: SubMenuSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<SubMenuSelectOptionsProps | null>(null)
  const [isSelectMenuOpen, setSelectMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const setAparence = useAparence(state => state.setAparence)
  const aparence = useAparence(state => state.aparence)

  const handleChange = (option: any) => {
    setSelectedOption(option)
    if (option?.value) {
      setAparence(option.value, '')
    }
  }

  useEffect(() => {
    setIsClient(true)
    if (options?.length) {
      const option = options.find(option => option.value === aparence) ?? null
      setSelectedOption(option)
    } else {
      setSelectedOption(null)
    }
  }, [options])

  if (!isClient) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        ['group flex items-center rounded-lg']
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
          onChange={handleChange}
          noOptionsMessage={() => ''}
          id={name}
          onMenuOpen={() => setSelectMenuOpen(true)}
          onMenuClose={() => setSelectMenuOpen(false)}
          options={options}
          className='z-50 flex justify-end rounded-lg w-full placeholder:text-white cursor-pointer'
          placeholder=''
          menuPlacement='auto'
          isSearchable={false}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            option: (provided, state) => ({
              ...provided,
              padding: '0.5rem',
              paddingLeft: '0.75rem',
              borderRadius: '0.5rem',
              marginTop: '0.5rem',
              color: 'var(--textSecondary)',
              border: '0px solid var(--backgroundSecondary)',
              fontSize: '0.875rem',
              backgroundColor: state.isSelected
                ? 'var(--backgroundPrimary)'
                : state.isFocused
                  ? 'var(--backgroundSecondary)'
                  : 'transparent',
              ':hover': {
                backgroundColor: state.isSelected
                  ? state.isFocused
                    ? 'var(--backgroundPrimary)'
                    : 'var(--backgroundPrimary)'
                  : 'var(--backgroundPrimary)',
              },
            }),
            menu: (provided, state) => ({
              ...provided,
              color: '#fff',
              borderRadius: '0.5rem',
              boxShadow:
                'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
              border: '1px solid var(--outlinePrimary)',
              paddingTop: '0',
              paddingBottom: '0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              fontSize: '0.875rem',
              zIndex: 50,
              backgroundColor: 'var(--backgroundSecondary)',
              cursor: 'pointer',
              width: '13ch',
            }),
            control: (provided, state) => ({
              ...provided,
              border: state.isFocused
                ? '0px solid var(--backgroundSecondary)'
                : '0px solid var(--backgroundSecondary)',
              backgroundColor: 'transparent',
              boxShadow: state.isFocused ? '0 0 0 0px #FB923C' : 'none',
              width: '100%',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              paddingLeft: icon ? '2rem' : '0',
              cursor: 'pointer',
            }),
            placeholder: provided => ({
              ...provided,
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
              fontSize: '0.875rem',
              textAlign: 'end',
              paddingRight: '1.5rem',
            }),
          }}
        />

        <span
          className={cn(
            {
              '-rotate-90': !isSelectMenuOpen,
            },
            [
              'right-0 absolute flex items-center mr-3 h-full transition-all duration-300',
            ]
          )}
        >
          <CarretDownIcon />
        </span>

        <span className='top-0 right-7 z-10 absolute flex items-center px-2 h-full text-zinc-500 text-xs peer-focus:scale-75'>
          {label}
        </span>
      </div>
    </div>
  )
}
