'use client'
export default function Home() {
  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='flex flex-col gap-6 bg-[--backgroundPrimary] p-6 sm:rounded-2xl w-full h-full'>
        {/* <button
          type='button'
          className='flex flex-row items-center bg-[--errorLoader] px-3 py-2 rounded-xl w-full transition-all duration-300'
        >
          <BellSimpleRinging
            size={18}
            weight='fill'
            className='text-white group-hover:text-red-400/30 scale-125 sm:scale-100 transition-all duration-300'
          />

          <span className='ml-3 font-medium text-white text-sm'>
            9 colaboradores ainda não retiraram seus EPIs dentro do prazo,
          </span>

          <span className='ml-1 font-medium text-white text-sm underline'>
            clique para ver a lista
          </span>
        </button> */}

        {/* <div className='gap-3 grid grid-cols-2 sm:grid-cols-3'>
          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-amber-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <HardHat
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-amber-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-amber-400 text-xl transition-all duration-300'>
              Equipamentos
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-purple-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-2 -mb-6'>
              <Users
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-purple-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-purple-400 text-xl transition-all duration-300'>
              Colaboradores
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-emerald-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <IdentificationBadge
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-emerald-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-emerald-400 text-xl transition-all duration-300'>
              Operadores
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] rounded-xl w-full overflow-hidden hover:text-[--primaryColor] hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <ChartBar
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-[--primaryColor]/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-[--primaryColor] text-xl transition-all duration-300'>
              Relatórios
            </span>
          </div>

          <div className='group relative flex items-center gap-3 bg-[--backgroundSecondary] hover:shadow-lg p-6 py-10 border border-[--outlinePrimary] hover:border-red-400/50 rounded-xl w-full overflow-hidden hover:scale-[1.015] transition-all duration-300 cursor-pointer'>
            <span className='group right-0 bottom-0 absolute -mr-6 -mb-6'>
              <Gear
                size={100}
                weight='duotone'
                className='text-[--outlinePrimary] group-hover:text-red-400/30 scale-125 sm:scale-100 transition-all duration-300'
              />
            </span>
            <span className='z-20 font-medium text-[--textSecondary] group-hover:text-red-400 text-xl transition-all duration-300'>
              Ajustes
            </span>
          </div>
        </div> */}
      </div>
    </div>
  )
}
