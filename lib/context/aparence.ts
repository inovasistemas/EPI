import { useTheme } from 'next-themes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AparenceProps = {
  aparence: 'system' | 'dark' | 'light',
  trueAparence: '' | 'dark' | 'light',
  setAparence: (aparence: 'system' | 'dark' | 'light', trueAparence: '' | 'dark' | 'light') => void
}

const useAparence = create<AparenceProps>()(
  persist(
    (set, get) => ({
      aparence: 'system',
      trueAparence: '',
      setAparence: (aparence, trueAparence) => {
        set({ aparence, trueAparence })
      },
    }),
    {
      name: 'aparenceStorage',
    }
  )
)

export default useAparence
