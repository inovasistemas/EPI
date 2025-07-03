'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import LogotypeLight from '@/public/img/logo@light.png'
import LogotypeDark from '@/public/img/logo@dark.png'

type LogoProps = {
  width: number
}

export function Logo({ width }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Image
      src={resolvedTheme === 'dark' ? LogotypeDark : LogotypeLight}
      alt='Logo'
      width={width}
      priority
    />
  )
}
