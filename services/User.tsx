import axios from 'axios'

export async function getPermissionGroups() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups`,
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

type GetUsersType = {
  q?: string
  permissionGroup?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type CreateUserType = {
  name: string
  email: string
  password: string
  permissionGroup: string
}

type UpdateUserType = {
  id: string
  name: string
  email: string
  password?: string
  permissionGroup?: string
}

export async function getUsers({
  q,
  permissionGroup,
  sortField,
  sortOrder,
  page = 1,
}: GetUsersType) {
  try {
    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (permissionGroup) params.permissionGroup = permissionGroup

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users`,
      { params, withCredentials: true }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }
    return null
  }
}

export async function getUser(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`,
      { withCredentials: true }
    )
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
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

export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/${id}`,
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
