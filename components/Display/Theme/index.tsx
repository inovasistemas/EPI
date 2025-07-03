'use client'

import { ThemeProvider } from 'next-themes'
import useAparence from '@/lib/context/aparence'
import { useEffect, useState } from 'react'

export default function Theme({ children }: { children: React.ReactNode }) {
  const trueAparence = useAparence(state => state.trueAparence)
  const aparence = useAparence(state => state.aparence)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute='class' forcedTheme={trueAparence} enableSystem>
      {children}
    </ThemeProvider>
  )
}
