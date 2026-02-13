import axios from 'axios'
import type { EnrollBiometricsProps } from './types/BioUSB'

export async function EnrollBiometrics({ loading }: EnrollBiometricsProps) {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BIOUSB}/enroll`
    )
    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      loading(false)
      return error.response || null
    }
    loading(false)
    return null
  }
}

export async function IdentifyBiometrics({ loading }: EnrollBiometricsProps) {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return {
    status: 200,
    data: {
      id: 1,
      found: true,
      status: 'successful',
    }
  }
  
  // try {
  //   loading(true)
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BIOUSB}/identify`
  //   )
  //   loading(false)
  //   return response
  // } catch (error: unknown) {
  //   if (axios.isAxiosError(error)) {
  //     loading(false)
  //     return error.response || null
  //   }
  //   loading(false)
  //   return null
  // }
}