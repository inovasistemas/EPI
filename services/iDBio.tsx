import axios from 'axios'
import type { EnrollBiometricsProps, IdentifyBiometricsProps } from './types/iDBio'

export async function EnrollBiometrics({ id, loading }: EnrollBiometricsProps) {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BIOUSB}/biometry/enroll/${id}`
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

export async function IdentifyBiometrics({ loading }: IdentifyBiometricsProps) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BIOUSB}/biometry/identify`
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