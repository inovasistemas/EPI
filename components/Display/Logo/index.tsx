'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import LogotypeLight from '@/public/img/logo@light.png'
import LogotypeDark from '@/public/img/logo@dark.png'
import useAparence from '@/lib/context/aparence'

type LogoProps = {
  width: number
}

export function Logo({ width }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const aparence = useAparence(state => state.aparence)
  const [aparenceTheme, setAparenceTheme] = useState<'light' | 'dark'>('light')
  const setAparence = useAparence(state => state.setAparence)

  useEffect(() => {
    let theme: 'light' | 'dark' = 'light'
    if (aparence === 'system') {
      theme = resolvedTheme === 'dark' ? 'dark' : 'light'
    } else {
      theme = aparence === 'dark' ? 'dark' : 'light'
    }
    setAparenceTheme(theme)
  }, [aparence, resolvedTheme])

  useEffect(() => {
    setAparence(aparence, aparenceTheme)
    setMounted(true)
  }, [aparence, aparenceTheme, setAparence])

  if (!mounted) return null

  return (
    <Image
      src={aparenceTheme === 'dark' ? LogotypeDark : LogotypeLight}
      alt='Logo'
      width={width}
      priority
      className='select-none'
    />
  )
}
