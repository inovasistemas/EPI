import { logoutUserOn401 } from '@/utils/logout'
import axios from 'axios'

export async function getSummaryReports({ loading }: GetSummaryReports) {
  try {
    loading(true)
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/reports/summary`,
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

export async function getAuditReport({
  collaborator,
  end_date,
  loading,
  page = 1,
  q,
  sector,
  sortField,
  sortOrder,
  start_date,
  status
}: GetAuditReportProps) {
  try {
    loading(true)

    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (sector) params.sector = sector
    if (collaborator) params.collaborator = collaborator
    if (start_date) params.start_date = start_date
    if (end_date) params.end_date = end_date
    if (status === false || status === true) params.status = status

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/reports/audit`,
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

export async function getAuditReportPrint({
  collaborator,
  end_date,
  loading,
  page = 1,
  q,
  sector,
  sortField,
  sortOrder,
  start_date,
  status
}: GetAuditReportProps) {
  try {
    loading(true)

    const params: Record<string, any> = {
      page,
    }

    if (q) params.q = q
    if (sortField) params.sortField = sortField
    if (sortOrder) params.sortOrder = sortOrder
    if (sector) params.sector = sector
    if (collaborator) params.collaborator = collaborator
    if (start_date) params.start_date = start_date
    if (end_date) params.end_date = end_date
    if (status === false || status === true) params.status = status

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/reports/audit/print`,
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

export async function getResourcesReport({
  end_date,
  start_date,
  loading
}: getResourcesReportProps) {
  try {
    loading(true)

    const params: Record<string, any> = {}

    if (start_date) params.dateStart = start_date
    if (end_date) params.dateEnd = end_date

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/reports/resources`,
      { params, withCredentials: true },
    )

    console.log('oi')

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