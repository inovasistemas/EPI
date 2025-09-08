import axios from 'axios'
import {
  CreatePermissionGroupType,
  UpdatePermissionGroupType,
} from './types/PermissionGroup'

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

export async function getPermissionGroup(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups/${id}`,
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

export async function getPermissionGroupTemplate() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/template/permission-groups`,
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

export async function deletePermissionGroup(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups/${id}`,
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

export async function updatePermissionGroup({
  id,
  payload,
}: UpdatePermissionGroupType) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups/${id}`,
      payload,
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

export async function createPermissionGroup({
  payload,
}: CreatePermissionGroupType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/permission-groups`,
      payload,
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
