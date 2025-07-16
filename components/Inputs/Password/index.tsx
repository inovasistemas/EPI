import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
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
          <Eye size={18} weight='bold' className='text-[--textSecondary]' />
        ) : (
          <EyeClosed
            size={18}
            weight='bold'
            className='text-[--textSecondary]'
          />
        )
      }
      actionButton={handleShowPassword}
    />
  )
}
