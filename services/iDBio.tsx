import axios from 'axios'
import type { EnrollBiometricsProps, IdentifyBiometricsProps } from './types/iDBio'

export async function EnrollBiometrics({ id, loading }: EnrollBiometricsProps) {
  try {
    loading(true)
    await DeleteBiometrics(id)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BIOUSB}/biometry/enroll/${id}`
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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BIOUSB}/biometry/identify`
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

async function DeleteBiometrics(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BIOUSB}/biometry/templates/${id}`
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}