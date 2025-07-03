import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserProps = {
  user_name: string,
  permissions: string
  setUser: (user_name: string, permissions: string) => void
}

const useUser = create<UserProps>()(
  persist(
    (set, get) => ({
      user_name: '',
      permissions: '',
      setUser: (user_name, permissions) => {
        set({ user_name, permissions })
      },
    }),
    {
      name: 'userStorage',
    }
  )
)

export default useUser
