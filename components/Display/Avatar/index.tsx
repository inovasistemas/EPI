import useUser from '@/lib/context/user'

export function ProfilePicture() {
  const userName = useUser(state => state.user_name)
  const letterInitial = userName?.charAt(0).toUpperCase() || ''

  return (
    <div className='hidden relative sm:flex justify-center items-center bg-[--primaryColor] bg-cover bg-no-repeat bg-center border border-[--border] rounded-full w-8 h-8 font-medium text-white select-none'>
      <span className='select-none'>{letterInitial}</span>
    </div>
  )
}
