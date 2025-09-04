type GetUsersType = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
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

type UpdateUserMePasswordType = {
  code: string
  oldPassword: string
  password: string
}
