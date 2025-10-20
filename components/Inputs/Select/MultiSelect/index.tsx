'use client'
import cn from 'classnames'
import type React from 'react'
import { useEffect, useState } from 'react'
import Select, { IndicatorsContainerProps } from 'react-select'
import { CaretDownIcon } from '@/components/Display/Icons/CaretDownIcon'
import { Skeleton } from '@/components/ui/skeleton'

type MultiSelectOptionsProps = {
  value: string
  label: string
}

type MultiSelectProps = {
  name: string
  label?: string
  icon?: React.ReactElement
  options: MultiSelectOptionsProps[]
  placeholder?: string
  value?: string | MultiSelectOptionsProps[] | null
  onChange: (value: string | MultiSelectOptionsProps[]) => void
  background?: string
  required?: boolean
  isMulti?: boolean
}

export function MultiSelect({
  name,
  label,
  icon,
  options,
  placeholder,
  value = null,
  onChange,
  background = 'bg-[--backgroundSecondary]',
  required = false,
  isMulti = false
}: MultiSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<MultiSelectOptionsProps | null>(null)
  const [isSelectMenuOpen, setSelectMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const multiValue = Array.isArray(value)
      ? value.map(v => typeof v === 'string' ? { value: v, label: v } : v)
      : value
        ? [typeof value === 'string' ? { value, label: value } : value]
        : []

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
    <>
    {options.length === 0 || !options[0]?.label
      ? <Skeleton className='rounded-xl w-full h-[54px]' />
      : <div
      className={cn(
        {
          'grid-cols-2 relative': icon,
        },
        [
          background,
          'min-h-[54px] group relative flex items-center border-box rounded-xl outline outline-transparent focus-within:outline-2 focus-within:outline-[--primaryColor] transition-all duration-300',
        ]
      )}
    >
      {icon && (
        <span className='top-0 left-0 z-50 absolute flex items-center mr-1 ml-3 h-full'>
          {icon}
        </span>
      )}

      <div className='relative flex items-center w-full'>
        {!isMulti && (
          <Select
            value={selectedOption}
            onChange={option => {
              if (typeof onChange === 'function') {
                // @ts-ignore
                onChange(option ? option.value : '')
              }
            }}
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
        )}

        {isMulti && (
          <Select
            isMulti
            defaultValue={multiValue}
            noOptionsMessage={() => ''}
            id={name}
            onChange={(selected) => {
              if (Array.isArray(selected) && typeof onChange === 'function') {
                onChange(selected as MultiSelectOptionsProps[]);
              }
            }}
            onMenuOpen={() => setSelectMenuOpen(true)}
            onMenuClose={() => setSelectMenuOpen(false)}
            options={options}
            className={cn(
              {
                'mt-0': label,
                'h-[54px]': !isMulti,
              },
              'min-h-[54px] flex justify-end rounded-xl w-full placeholder:text-white cursor-pointer'
            )}
            placeholder={placeholder}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              IndicatorsContainer: () => null,
              Placeholder: (props) => {
                const { innerProps, children, selectProps, isFocused } = props;

                if (isFocused) return null;

                const placeholderStyle = {
                  fontSize: '1rem',
                  color: 'var(--labelPrimary)',
                };

                return (
                  <div {...innerProps} style={placeholderStyle}>
                    {children}
                  </div>
                );
              },
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
                  backgroundColor: 'var(--buttonHover)',
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
                border: '0',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                width: '100%',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                paddingLeft: icon ? '2rem' : '0',
                cursor: 'pointer',
                minHeight: '54px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
              }),
              placeholder: provided => ({
                ...provided,
                fontSize: '1rem',
                color: 'var(--labelPrimary)',
              }),
              valueContainer: (provided) => ({
                ...provided,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.25rem',
                overflowX: 'auto',
                padding: '0.25rem 0.5rem',
              }),
              multiValue: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                color: 'var(--textSecondary)',
                backgroundColor: 'var(--backgroundSecondary)',
                borderRadius: '0.5rem',
                padding: '0 0.25rem',
                marginRight: '0.25rem',
                whiteSpace: 'nowrap',
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: 'var(--textSecondary)',
                ':hover': {
                  backgroundColor: 'transparent',
                  color: 'var(--errorLoader)',
                },
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'var(--textSecondary)',
                fontSize: '0.875rem',
              }),
              input: (provided) => ({
                ...provided,
                display: 'inline-flex',
                alignItems: 'center',
                width: 'auto',
                minWidth: '60px',
                fontSize: '1rem',
                color: 'var(--textSecondary)',
                flexGrow: 1
              }),
            }}
          />
        )}

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

        {label && !isMulti && (
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
    }
    </>
  )
}
