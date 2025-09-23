import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserProps = {
  user_name: string
  permissions: string
  enterprise: string
  setUser: (user_name: string, permissions: string, enterprise: string) => void
}

const useUser = create<UserProps>()(
  persist(
    (set, get) => ({
      user_name: '',
      permissions: '',
      enterprise: '',
      setUser: (user_name, permissions, enterprise) => {
        set({ user_name, permissions, enterprise })
      },
    }),
    {
      name: 'userStorage',
    }
  )
)

export default useUser
