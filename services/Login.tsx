import axios from 'axios'

export async function isUserRegistered({ email, loading }: IsUserRegisteredProps) {
  try {
    loading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/exists`,
      { email }
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

export async function postAuth({ email, password, loading }: PostAuthProps) {
  try {
    loading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/auth`,
      {
        email,
        password
      },
      {
        withCredentials: true,
      }
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

export async function setTwoFactorAuthentication({loading}: SetTwoFactorAuthenticationProps) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/me/2fa`,
      {
        withCredentials: true,
      }
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

export async function checkTwoFactorAuthentication({ code, loading }: CheckTwoFactorAuthenticationProps) {
  try {
    loading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/auth/2fa`,
      {code},
      {
        withCredentials: true,
      }
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
