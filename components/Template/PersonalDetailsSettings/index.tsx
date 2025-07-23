import { useState } from 'react'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'

export function PersonalDetailsSettings() {
  const [operatorData, setOperatorData] = useState({
    name: 'João Felipe Gomes',
    email: 'teste@inovasistemas.com.br',
  })

  const [customOperatorData, setCustomOperatorData] = useState({
    name: operatorData.name,
    email: operatorData.email,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (name: string, value: string) => {
    const newData = {
      ...customOperatorData,
      [name]: value,
    }

    setCustomOperatorData(newData)

    const changed =
      newData.name !== operatorData.name || newData.email !== operatorData.email

    setHasChanges(changed)
  }

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl'>Dados pessoais</h2>
        </div>

        <div className='gap-3 grid grid-cols-2 pt-8 h-full'>
          <FormInput
            name='name'
            label='Nome'
            required={false}
            type='text'
            value={customOperatorData.name}
            position='right'
            onChange={e => handleChange('name', e.target.value)}
          />

          <FormInput
            name='email'
            label='E-mail'
            required={false}
            type='text'
            value={customOperatorData.email}
            position='right'
            onChange={e => handleChange('email', e.target.value)}
          />
        </div>
      </div>

      <ActionGroupSave actionDisabled={!hasChanges} />
    </div>
  )
}
