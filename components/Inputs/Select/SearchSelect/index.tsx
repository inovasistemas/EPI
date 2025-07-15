'use client'
import { CaretDown } from '@phosphor-icons/react'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'

type SearchSelectOptionsProps = {
  value: string
  label: string
}

type SearchSelectProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: SearchSelectOptionsProps[]
  placeholder?: string
  value?: string | null
  onChange: (value: string) => void
}

export function SearchSelect({
  name,
  label,
  icon,
  options,
  placeholder,
  value = null,
  onChange,
}: SearchSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<SearchSelectOptionsProps | null>(null)
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

  if (label) {
  }

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        [
          'group relative flex items-center bg-[--backgroundSecondary] border-box rounded-xl outline outline-transparent focus-within:outline-2 focus-within:outline-[--primaryColor] transition-all duration-300',
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
          onChange={option => onChange(option ? option.value : '')}
          noOptionsMessage={() => ''}
          id={name}
          onMenuOpen={() => setSelectMenuOpen(true)}
          onMenuClose={() => setSelectMenuOpen(false)}
          options={options}
          className={cn(
            {
              'mt-4 ': label,
            },
            [
              'h-[54px] z-50 flex justify-end rounded-lg w-full placeholder:text-white cursor-pointer',
            ]
          )}
          placeholder={placeholder}
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
              fontSize: '1rem',
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
            menu: provided => ({
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
              fontSize: '1rem',
              zIndex: 50,
              backgroundColor: 'var(--backgroundSecondary)',
              cursor: 'pointer',
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
              height: '100%',
            }),
            placeholder: provided => ({
              ...provided,
              width: '100%',
              fontSize: '1rem',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--labelPrimary)',
            }),
            input: provided => ({
              ...provided,
              color: 'var(--textSecondary)',
              fontFamily: 'inherit',
              width: '100%',
              fontSize: '1rem',
              height: '100%',
            }),
            singleValue: provided => ({
              ...provided,
              color: 'var(--textSecondary)',
              fontSize: '1rem',
              textAlign: 'start',
              paddingRight: '1.5rem',
              height: '100%',
              alignItems: 'center',
              display: 'flex',
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
          <CaretDown
            size={20}
            weight='bold'
            className='text-[--textSecondary]'
          />
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
