import { FC } from 'react'
import { PageSearch } from '@/components/Display/PageSearch'
import { PageTitle } from '@/components/Display/PageTitle'

const Deboning: FC = async () => {
  return (
    <div className='flex flex-col gap-6 bg-[#E5E5E5] pt-6 pb-16 sm:pb-6 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <PageTitle />

      <div className='flex flex-col gap-6 px-6 pb-6'>
        <div className='border-[#CECECE] border-b'>
          <ul className='flex flex-row gap-6 px-6'>
            <li className='relative px-1 sm:px-3 pb-3'>
              <button className='font-medium text-primary hover:text-primaryDarker transition-all duration-200'>
                Gestão de produção
              </button>
              <span className='bottom-0 left-0 absolute bg-primary rounded-t-md w-full h-[3px]'></span>
            </li>
            <li className='relative px-1 sm:px-3 pb-3'>
              <button className='font-medium text-black hover:text-primary transition-all duration-200'>
                Gestão de modelos
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-6 bg-[#F5F5F5] p-4 border-[#D9D9D9] border-y w-full min-h-screen'>
        <div>
          <PageSearch />
        </div>
        <div className='flex justify-start'>
          <div className='w-full'>
            <div className='gap-3 grid sm:grid-cols-3 bg-white p-3 sm:p-4 border border-[#E5E5E5] rounded-md w-full transition-all duration-200 cursor-pointer'>
              <div className='flex flex-col'>
                <span className='text-[#737373] text-xs'>#3014203841</span>
                <span className='font-medium text-black text-sm'>
                  Boi Nobre
                </span>
              </div>
              <div className='sm:col-span-2 bg-[#F5F5F5] p-3 rounded-md w-full h-full'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deboning
