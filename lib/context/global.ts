import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type StoreProps = {
  isSidebarVisible: boolean
  toggleSidebarVisibility: () => void
}

const useSidebar = create<StoreProps>()(
  persist(
    (set, get) => ({
      isSidebarVisible: true,
      toggleSidebarVisibility: () =>
        set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
    }),
    {
      name: 'sidebarStorage',
    }
  )
)

export default useSidebar
