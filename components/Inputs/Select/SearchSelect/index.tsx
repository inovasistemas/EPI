'use client'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { CaretDownIcon } from '@/components/Display/Icons/CaretDownIcon'

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
  background?: string
  required?: boolean
}

export function SearchSelect({
  name,
  label,
  icon,
  options,
  placeholder,
  value = null,
  onChange,
  background = 'bg-[--backgroundSecondary]',
  required = false,
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

  return (
    <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        [
          background,
          'max-h-[54px] group relative flex items-center border-box rounded-xl outline outline-transparent focus-within:outline-2 focus-within:outline-[--primaryColor] transition-all duration-300',
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
              'mt-0': label,
            },
            'h-[54px] flex justify-end rounded-xl w-full placeholder:text-white cursor-pointer'
          )}
          placeholder={placeholder}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          formatOptionLabel={option =>
            option.label
              .toLowerCase()
              .replace(/(?:^|\s)\S/g, char => char.toUpperCase())
          }
          styles={{
            option: (provided, state) => ({
              ...provided,
              padding: '0.5rem',
              paddingLeft: '0.75rem',
              borderRadius: '0.75rem',
              marginTop: '0.5rem',
              color: 'var(--textSecondary)',
              border: '0px solid var(--backgroundSecondary)',
              fontSize: '1rem',
              textTransform: 'capitalize',
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
            menu: provided => ({
              ...provided,
              color: '#fff',
              borderRadius: '0.75rem',
              boxShadow:
                '0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              border: '1px solid var(--outlinePrimary)',
              paddingTop: '0',
              paddingBottom: '0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              fontSize: '1rem',
              zIndex: 200,
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
              borderRadius: '0.75rem',
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
              textTransform: 'capitalize',
              paddingRight: '1.5rem',
              height: '100%',
              alignItems: 'center',
              display: 'flex',
              boxSizing: 'border-box',
            }),
          }}
        />

        {required && (
          <label
            htmlFor={name}
            className={cn(
              {
                hidden: selectedOption?.value || isSelectMenuOpen,
              },
              [
                'peer-placeholder-shown:block top-4 right-7 absolute px-2 text-[--errorLoader] text-base duration-300',
              ]
            )}
          >
            *
          </label>
        )}

        <span
          className={cn(
            {
              'rotate-180': isSelectMenuOpen,
            },
            [
              'mr-3 right-0 absolute flex items-center  h-full transition-all duration-300',
            ]
          )}
        >
          <CaretDownIcon size='size-5' stroke='stroke-[--textSecondary]' />
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
