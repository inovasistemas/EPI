import { AddIcon } from '@/components/Display/Icons/Add'
import { CreateButton } from '@/components/Navigation/CreateButton'
import { FC } from 'react'
import { PaginationSummary } from '@/components/Utils/PaginationSummary'
import { SearchIcon } from '@/components/Display/Icons/Search'
import { SearchInput } from '@/components/Inputs/Text/SearchInput'
import { ListItem } from '@/components/Display/List/ListItem'
import { TuneIcon } from '@/components/Display/Icons/Tune'
import { pageMetadata } from '@/lib/misc/metadata'
import { CarretUpDown } from '@/components/Display/Icons/CaretUpDown'
import { SmallSelect } from '@/components/Inputs/Select/SmallSelect'
import { FilterButton } from '@/components/Inputs/Button/FilterButton'
import { OrderByIcon } from '@/components/Display/Icons/OrderBy'

export const metadata = pageMetadata('Clientes')

const Products: FC = async () => {
  const status = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' },
  ]

  const clientList = [
    {
      id: 1,
      name: 'Mercado E Empório Prado21',
      document: '38.149.079/0001-90',
      city: 'São Paulo',
      uf: 'SP',
      code: '000001',
    },
    {
      id: 2,
      name: 'Empório Brito - Ceasa',
      document: '35.674.652/0001-96',
      city: 'Rio de Janeiro',
      uf: 'RJ',
      code: '000002',
    },
    {
      id: 3,
      name: 'Mm Ferrari Plantas Ceasa - Moíses',
      document: '26.715.551/0001-25',
      city: 'Belo Horizonte',
      uf: 'MG',
      code: '000003',
    },
    {
      id: 4,
      name: 'Loja Nasbet Produtos De Limpeza',
      document: '30.210.802/0001-97',
      city: 'Curitiba',
      uf: 'PR',
      code: '000004',
    },
    {
      id: 5,
      name: 'Restaurante Conde',
      document: '31.327.684/0001-64',
      city: 'Porto Alegre',
      uf: 'RS',
      code: '000005',
    },
    {
      id: 6,
      name: 'Pizzaria Da Chicca',
      document: '35.893.994/0001-05',
      city: 'Brasília',
      uf: 'DF',
      code: '000006',
    },
    {
      id: 7,
      name: 'Adega O Copão 1 - Cliente Luis',
      document: '48.299.852/0001-58',
      city: 'Salvador',
      uf: 'BA',
      code: '000007',
    },
    {
      id: 8,
      name: 'Rr Motos',
      document: '17.097.145/0001-55',
      city: 'Recife',
      uf: 'PE',
      code: '000008',
    },
    {
      id: 9,
      name: 'Mercado Veruska',
      document: '07.593.545/0001-06',
      city: 'Belém',
      uf: 'PA',
      code: '000009',
    },
    {
      id: 10,
      name: 'Material Construção Paulinho Abilla',
      document: '28.439.473/0001-09',
      city: 'São Luís',
      uf: 'MA',
      code: '000010',
    },
  ]

  const exibition = [
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '5000', label: '5000' },
  ]

  return (
    <div className='relative flex flex-col gap-6 bg-zinc-50 p-6 pb-20 sm:pb-6 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex items-center gap-3'>
        <h2 className='font-semibold text-2xl leading-none'>Clientes</h2>
        <CreateButton
          label='Novo'
          icon={
            <AddIcon
              fill='fill-white group-hover:fill-white'
              height='w-3'
              width='h-3'
              stroke='stroke-white'
            />
          }
          href='/clientes/novo'
        />
      </div>

      <div className='gap-6 grid sm:grid-cols-4'>
        <div className='flex flex-row items-center gap-3 col-span-4'>
          <div className='w-full sm:w-2/3'>
            <SearchInput
              label='Pesquisa'
              name='search'
              required={false}
              icon={<SearchIcon fill='fill-none' height='w-4' width='h-4' />}
            />
          </div>
          <FilterButton
            label=''
            name='status'
            icon={
              <TuneIcon
                fill='fill-none'
                height='w-3.5'
                width='h-3.5'
                stroke='stroke-black'
              />
            }
          />

          <FilterButton
            label=''
            name='status'
            icon={
              <OrderByIcon
                fill='fill-none'
                height='w-3.5'
                width='h-3.5'
                stroke='stroke-black'
              />
            }
          />
        </div>
      </div>

      <div className='flex flex-col bg-white border border-[#D9D9D9] rounded-md divide-y divide-[#D9D9D9] w-full'>
        <div className='rounded-md divide-y divide-[#D9D9D9] overflow-hidden'>
          <div className='gap-3 grid grid-cols-7 sm:grid-cols-12 bg-zinc-100 p-3 w-full font-medium text-sm transition-all duration-150'>
            <div className='hidden sm:flex justify-left col-span-1'>
              <button
                type='button'
                className='flex justify-left items-center gap-2 hover:opacity-60 truncate transition-all duration-150'
              >
                <span>Código</span>
                <CarretUpDown fill='fill-black' height='h-4' width='w-4' />
              </button>
            </div>
            <div className='col-span-6'>
              <button
                type='button'
                className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-150'
              >
                <span>Nome</span>
                <CarretUpDown fill='fill-black' height='h-4' width='w-4' />
              </button>
            </div>
            <div className='col-span-2'>
              <button
                type='button'
                className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-150'
              >
                <span>Documento</span>
                <CarretUpDown fill='fill-black' height='h-4' width='w-4' />
              </button>
            </div>
            <div className='hidden sm:block col-span-2'>
              <button
                type='button'
                className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-150'
              >
                <span>Cidade</span>
                <CarretUpDown fill='fill-black' height='h-4' width='w-4' />
              </button>
            </div>
            <div className='hidden sm:block col-span-1'>
              <button
                type='button'
                className='flex items-center gap-2 hover:opacity-60 truncate transition-all duration-150'
              >
                <span>Estado</span>
                <CarretUpDown fill='fill-black' height='h-4' width='w-4' />
              </button>
            </div>
          </div>
          {clientList.map((client, index) => (
            <ListItem key={index} data={client} />
          ))}
        </div>
      </div>

      <div className='flex flex-row justify-between items-center gap-6'>
        <PaginationSummary from={1} to={clientList.length} total={246} />
        <div className='min-w-36'>
          <SmallSelect label='/ página' name='status' options={exibition} />
        </div>
      </div>
    </div>
  )
}

export default Products
