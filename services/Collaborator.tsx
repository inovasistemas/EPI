import axios from 'axios'

export async function getCollaborators({
  loading,
  q,
  jobPosition,
  sortField,
  sortOrder,
  page = 1,
}: CollaboratorsService) {
  try {
    loading(true)

    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (jobPosition) params.jobPosition = jobPosition

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/collaborators`,
      { params, withCredentials: true }
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }

    loading(false)
    return null
  }
}

export async function getCollaborator({ loading, id }: CollaboratorService) {
  try {
    loading(true)

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/collaborators/${id}`,
      { withCredentials: true }
    )

    loading(false)
    return response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response || null
    }

    loading(false)
    return null
  }
}
