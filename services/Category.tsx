import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getCategories({loading}: GetCategoriesProps) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function getCategory({id, loading}: CategoryService) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories/${id}`,
      {
        withCredentials: true,
      }
    )
    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      loading(false)
      return error.response || null
    }
    loading(false)
    return null
  }
}

export async function createCategory(name: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
      {
        name,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function createSubcategory(id: string, name: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
      {
        parent: id,
        name,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories/${id}`,
      {
        name,
      },
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/categories/${id}`,
      {
        withCredentials: true,
      }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logoutUserOn401()
      }
      return error.response || null
    }
    return null
  }
}
