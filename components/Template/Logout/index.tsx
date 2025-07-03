'use client'

import { useEffect } from 'react'
import Cookies from 'cookies-js'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    Cookies.expire('authToken', { path: '/' })
    router.push('/entrar')
  }, [router])

  return null
}

export default Logout
