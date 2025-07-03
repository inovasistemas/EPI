import { FC } from 'react'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ArrowLeftIcon } from '@/components/Display/Icons/ArrowLeft'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { CarretDownIcon } from '@/components/Display/Icons/CarretDown'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'

const Products: FC = async () => {
  const status = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ]

  const typesOfPeople = [
    { value: 'fisica', label: 'Física' },
    { value: 'juridica', label: 'Jurídica' },
  ]

  const typesDefault = [
    { value: '0', label: 'Não' },
    { value: '1', label: 'Sim' },
  ]

  const businessLine = [{ value: '0', label: 'Vazio' }]

  return (
    <div className='relative flex flex-col gap-6 bg-zinc-50 p-6 pb-32 sm:pb-20 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-row justify-start items-center gap-3'>
        <div className='flex'>
          <GoBackButton
            label='Voltar'
            icon={<ArrowLeftIcon fill='fill-black' height='h-4' width='w-4' />}
            href='/clientes'
          />
        </div>
        <h2 className='font-semibold text-2xl leading-none'>Novo Cliente</h2>
      </div>

      <form className='flex flex-col gap-8'>
        <fieldset className='items-center gap-6 grid grid-cols-2 sm:grid-cols-4 py-3'>
          <FormInput
            name='code'
            label='Código'
            required={true}
            value='000001'
          />
          <SearchSelect label='Situação' name='status' options={status} />
          <SearchSelect label='Pessoa' name='status' options={typesOfPeople} />
          <SearchSelect
            label='Fidelidade'
            name='fidelity'
            options={typesDefault}
          />

          <div className='col-span-2'>
            <FormInput name='name' label='Nome fansatia' required={true} />
          </div>
          <div className='col-span-2'>
            <FormInput
              name='corporateName'
              label='Razão social'
              required={false}
            />
          </div>

          <FormInput name='document' label='CNPJ' required={false} />
          <FormInput name='ie' label='Inscrição estadual' required={false} />

          <div className='col-span-2'>
            <SearchSelect
              label='Ramo de Atividade'
              name='businessLine'
              options={businessLine}
            />
          </div>

          <FormInput name='credit' label='Limite de crédito' required={false} />
          <FormInput name='balance' label='Saldo' required={false} />
        </fieldset>

        <fieldset className='flex flex-col border-[#D9D9D9] border-t w-full'>
          <button
            type='button'
            className='flex flex-row justify-between hover:opacity-60 pt-3 h-10 transition-all duration-300'
          >
            <GroupLabel isVisible={true} label='Contato' showFixed={true} />
            <CarretDownIcon />
          </button>
          <div className='h-0 overflow-hidden'></div>
        </fieldset>

        <fieldset className='flex flex-col border-[#D9D9D9] border-t w-full'>
          <button
            type='button'
            className='flex flex-row justify-between hover:opacity-60 pt-3 h-10 transition-all duration-300'
          >
            <GroupLabel isVisible={true} label='Endereço' showFixed={true} />
            <CarretDownIcon />
          </button>
          <div className='h-0 overflow-hidden'></div>
        </fieldset>

        <fieldset className='flex flex-col border-[#D9D9D9] border-t w-full'>
          <button
            type='button'
            className='flex flex-row justify-between hover:opacity-60 pt-3 h-10 transition-all duration-300'
          >
            <GroupLabel isVisible={true} label='Observação' showFixed={true} />
            <CarretDownIcon />
          </button>
          <div className='h-0 overflow-hidden'></div>
        </fieldset>

        <fieldset className='flex flex-col border-[#D9D9D9] border-t w-full'>
          <button
            type='button'
            className='flex flex-row justify-between hover:opacity-60 pt-3 h-10 transition-all duration-300'
          >
            <GroupLabel isVisible={true} label='Produtos' showFixed={true} />
            <CarretDownIcon />
          </button>
          <div className='h-0 overflow-hidden'></div>
        </fieldset>
      </form>

      <ActionGroup />
    </div>
  )
}

export default Products
