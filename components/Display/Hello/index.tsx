'use client'
import useUser from '@/lib/context/user'

export function Hello() {
  const storeName = useUser(state => state.enterprise)
  return (
    <div className='flex flex-col justify-center items-start'>
      <span className='font-semibold text-2xl capitalize'>
        {storeName.toLocaleLowerCase()}
      </span>
    </div>
  )
}
