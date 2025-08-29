import axios from 'axios'

export async function getSectors() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/sectors`,
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
