type CollaboratorsService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  q?: string
  jobPosition?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type CollaboratorService = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}
