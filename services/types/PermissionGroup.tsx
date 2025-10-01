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

export type GetPermissionGroupProps = {
  id: string
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

export type CreatePermissionGroupType = {
  payload?: PermissionGroup
}

export type GetPermissionGroupsType = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}

export type GetPermissionGroupTemplateProps = {
  loading: React.Dispatch<React.SetStateAction<boolean>>
}
