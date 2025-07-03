import Sidebar from '@/components/Navigation/Sidebar'
import Searchbar from '@/components/Surfaces/Searchbar'

export function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col h-screen min-h-screen'>
      <Searchbar />
      <div className='flex w-full h-full root'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
