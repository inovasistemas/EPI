import { useState } from 'react'
import { ViewIcon } from '@/components/Display/Icons/View'
import { ViewOffIcon } from '@/components/Display/Icons/ViewOff'
import { FormInput } from '../Text/FormInput'

type PasswordInputProps = {
  name?: string
  label: string
  value: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export function PasswordInput({
  name = 'password',
  label,
  value,
  onChange,
  required = false,
  onKeyDown
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <FormInput
      name={name}
      label={label}
      required={required}
      type='password'
      reveal={showPassword}
      value={value}
      onChange={onChange}
      position='right'
      icon={
        showPassword ? (
          <ViewIcon size='size-5' stroke='stroke-[--textSecondary]' />
        ) : (
          <ViewOffIcon size='size-5' stroke='stroke-[--textSecondary]' />
        )
      }
      actionButton={handleShowPassword}
      onKeyDown={onKeyDown}
    />
  )
}
