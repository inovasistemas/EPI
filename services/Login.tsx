import axios from 'axios'

export async function isUserRegistered(data: { email: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/exists`,
      data
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function postAuth(data: { email: string; password: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/auth`,
      data,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function setTwoFactorAuthentication() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/me/2fa`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function checkTwoFactorAuthentication(data: { code: string }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/auth/2fa`,
      data,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}
