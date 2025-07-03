import { FC } from 'react'

type HomeProps = {
  params: Record<string, string>
}

const Home: FC<HomeProps> = async ({ params }) => {
  const { id } = await params

  return (
    <div className='sm:pt-0 pb-20 sm:pb-0 w-full lg:h-[calc(100vh-70px)] overflow-auto'>
      {id}
    </div>
  )
}

export default Home
