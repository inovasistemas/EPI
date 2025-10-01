type GetUsersType = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  q?: string
  permissionGroup?: string
  sortField?: string
  sortOrder?: string
  page?: number
}

type GetUserMeType = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type GetUserType = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  id: string
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
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

type UpdateUserMePasswordType = {
  code: string
  oldPassword: string
  password: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}
