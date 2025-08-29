type PermissionGroupsAccessType = {
  screen: string
  description: string
  show: boolean
  insert: boolean
  update: boolean
  delete: boolean
  password: boolean
  created_at: string
  updated_at?: string
}

type PermissionGroupsType = {
  uuid: string
  name: string
  active_users: number
  created_at: string
  updated_at?: string
  access: [PermissionGroupsAccessType]
}

type PermissionActionKey = 'insert' | 'update' | 'delete' | 'view'
