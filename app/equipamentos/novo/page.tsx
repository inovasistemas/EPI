'use client'
import { Image, TrendUp } from '@phosphor-icons/react'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateEquipment: FC = () => {
  const [equipmentData, setEquipmentData] = useState({
    picture: '',
    name: '',
    ean: '',
    cost: '',
    price: '',
    abc_classification: '',
    manufacturer: '',
    stock: '',
    stockMinimum: '',
    stockMaximum: '',
    category: '',
    family: '',
  })

  const handleChange = (name: string, value: string) => {
    setEquipmentData(prev => ({
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

          <div>
            <button
              type='button'
              className='flex justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg w-8 aspect-square font-medium text-[10px] transition-all duration-300'
            >
              <TrendUp
                size={18}
                weight='bold'
                className='text-[--textSecondary]'
              />
            </button>
          </div>
        </div>

        <form className='gap-y-10 grid px-6 w-full'>
          <div className='flex flex-row gap-4 w-full'>
            <div>
              <button
                type='button'
                className='flex justify-center items-center bg-[--backgroundSecondary] hover:opacity-70 border-[--border] border-2 border-dashed rounded-2xl w-32 aspect-square transition-all duration-300'
              >
                <Image
                  size={38}
                  weight='regular'
                  className='opacity-50 text-[--textSecondary] select-none'
                />
              </button>
            </div>

            <div className='gap-4 grid grid-cols-2 w-full'>
              <FormInput
                name='name'
                label='Nome'
                required={false}
                type='text'
                value={equipmentData.name}
                position='right'
                onChange={e => handleChange('name', e.target.value)}
              />

              <FormInput
                name='ean'
                label='EAN'
                required={false}
                type='text'
                value={equipmentData.ean}
                position='right'
                onChange={e => handleChange('ean', e.target.value)}
              />

              <div className='gap-3 grid grid-cols-2'>
                <FormInput
                  name='cost'
                  label='Valor de custo'
                  required={false}
                  type='text'
                  value={equipmentData.cost}
                  position='right'
                  onChange={e => handleChange('cost', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='gap-4 grid sm:grid-cols-4 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Estoque e dimensões'}
                showFixed={true}
              />
            </div>

            <FormInput
              name='stock'
              label='Estoque'
              required={false}
              type='text'
              value={equipmentData.stock}
              position='right'
              onChange={e => handleChange('stock', e.target.value)}
            />

            <FormInput
              name='stockMinimum'
              label='Estoque mínimo'
              required={false}
              type='text'
              value={equipmentData.stockMinimum}
              position='right'
              onChange={e => handleChange('stockMinimum', e.target.value)}
            />

            <FormInput
              name='stockMaximum'
              label='Estoque máximo'
              required={false}
              type='text'
              value={equipmentData.stockMaximum}
              position='right'
              onChange={e => handleChange('stockMaximum', e.target.value)}
            />
          </div>

          <div className='gap-4 grid sm:grid-cols-3 w-full'>
            <div className='hidden sm:block relative col-span-full mb-4'>
              <GroupLabel
                isVisible={true}
                label={'Categorias'}
                showFixed={true}
              />
            </div>

            <SearchSelect
              value={equipmentData.category}
              name='category'
              options={[
                { value: 'category1', label: 'Categoria 1' },
                { value: 'category2', label: 'Categoria 2' },
              ]}
              placeholder='Categoria'
              onChange={() => null}
            />

            <SearchSelect
              value={equipmentData.family}
              name='family'
              options={[
                { value: 'family1', label: 'Família 1' },
                { value: 'family2', label: 'Família 2' },
              ]}
              placeholder='Família'
              onChange={() => null}
            />

            <SearchSelect
              value={equipmentData.manufacturer}
              name='manufacturer'
              options={[
                { value: 'manufacturer1', label: 'Fabricante 1' },
                { value: 'manufacturer2', label: 'Fabricante 2' },
              ]}
              placeholder='Fabricante'
              onChange={() => null}
            />
          </div>
          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateEquipment
