type GetSummaryReports = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type GetAuditReportProps = {
  collaborator?: string
  end_date: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
  page?: number
  q?: string
  sector?: string
  sortField?: string
  sortOrder?: string
  start_date: string
  status?: boolean | null
}

type getResourcesReportProps = {
  end_date: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
  start_date: string
}