'use client'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateEquipment: FC = () => {
  const [formData, setFormData] = useState({
    name: 'Nome 1',
    manufacturer: 'manufacturer1',
    stock: '13',
    category: 'category1',
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/equipamentos' />

            <h2 className='font-medium text-2xl leading-none select-none'>
              Adicionar equipamento
            </h2>
          </div>
        </div>

        <form className='gap-y-10 grid px-6 w-full'>
          <div className='gap-4 grid sm:grid-cols-2 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Dados do Equipamento'}
                showFixed={true}
              />
            </div>

            <div className='flex flex-col gap-4'>
              <FormInput
                name='name'
                label='Nome'
                required={false}
                type='text'
                value={formData.name}
                position='right'
                onChange={e => handleChange('name', e.target.value)}
              />

              <FormInput
                name='stock'
                label='Estoque'
                required={false}
                type='text'
                value={formData.stock}
                position='right'
                onChange={e => handleChange('stock', e.target.value)}
              />
            </div>
          </div>

          <div className='gap-4 grid sm:grid-cols-2 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Categorização'}
                showFixed={true}
              />
            </div>

            <div className='flex flex-col gap-4'>
              <SearchSelect
                value={formData.category}
                name='category'
                options={[
                  { value: 'category1', label: 'Categoria 1' },
                  { value: 'category2', label: 'Categoria 2' },
                ]}
                placeholder='Categoria'
                onChange={() => null}
              />

              <SearchSelect
                value={formData.manufacturer}
                name='manufacturer'
                options={[
                  { value: 'manufacturer1', label: 'Fabricante 1' },
                  { value: 'manufacturer2', label: 'Fabricante 2' },
                ]}
                placeholder='Fabricante'
                onChange={() => null}
              />
            </div>
          </div>
          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateEquipment
