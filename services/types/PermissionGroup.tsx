type Permissions = {
  id: string
  name: string
  checked: boolean
}

type PermissionScreens = {
  screen: string
  description: string
  created_at: string
  updated_at: string | null
  permissions: Permissions[]
}

type PermissionGroup = {
  uuid: string
  name: string
  created_at: string
  updated_at: string | null
  screens: PermissionScreens[]
}

export type UpdatePermissionGroupType = {
  id: string
  payload?: PermissionGroup
}

export type CreatePermissionGroupType = {
  payload?: PermissionGroup
}
