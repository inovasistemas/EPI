import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getPermissionGroups() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups`,
      {
        withCredentials: true,
      },
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

export async function getUsers({
  loading,
  q,
  permissionGroup,
  sortField,
  sortOrder,
  page = 1,
}: GetUsersType) {
  try {
    loading(true)
    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (permissionGroup) params.permissionGroup = permissionGroup

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users`,
      { params, withCredentials: true },
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

export async function getUser({id, loading}: GetUserType) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`,
      { withCredentials: true },
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

export async function getUserMe() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/me`,
      { withCredentials: true },
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

export async function createUser({
  name,
  email,
  password,
  permissionGroup,
}: CreateUserType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/users`,
      {
        name,
        email,
        password,
        permissionGroup,
      },
      {
        withCredentials: true,
      },
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

export async function updateUser({
  id,
  name,
  email,
  password,
  permissionGroup,
}: UpdateUserType) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`,
      {
        name,
        email,
        password: password ? password : undefined,
        permission_group: permissionGroup ? permissionGroup : undefined,
      },
      {
        withCredentials: true,
      },
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

export async function updateUserMePassword({
  code,
  oldPassword,
  password,
  loading
}: UpdateUserMePasswordType) {
  try {
    loading(true)
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/me/password`,
      {
        code,
        old_password: oldPassword,
        password,
      },
      {
        withCredentials: true,
      },
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

export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`,
      {
        withCredentials: true,
      },
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
