import { useState } from 'react'
import { ViewIcon } from '@/components/Display/Icons/View'
import { ViewOffIcon } from '@/components/Display/Icons/ViewOff'
import { FormInput } from '../Text/FormInput'

type PasswordInputProps = {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInput({ label, value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <FormInput
      name='password'
      label={label}
      required={false}
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
    />
  )
}
