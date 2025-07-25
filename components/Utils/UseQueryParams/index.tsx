'use client'
import { useRouter, useSearchParams } from 'next/navigation'

function useClearQueryParams() {
  const router = useRouter()

  return () => {
    router.push('?')
  }
}

export function useQueryParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (paramsToUpdate: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (params.has(key)) {
        params.set(key, value)
      } else {
        params.append(key, value)
      }
    })

    router.push(`?${params.toString()}`)
  }
}

export { useClearQueryParams }
