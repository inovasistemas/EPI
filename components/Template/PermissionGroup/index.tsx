import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TrashIcon } from '@/components/Display/Icons/Trash'

type Permissions = {
  id: string
  name: string
  checked: boolean
}

type PermissionGroups = {
  id: string
  name: string
  permissions: Permissions[]
}

export function PermissionGroup() {
  const searchParams = useSearchParams()
  const permissionGroupParams = useMemo(() => {
    return {
      group: searchParams.get('permissionGroup'),
      type: searchParams.get('type'),
    }
  }, [searchParams])
  const [groupData, setGroupData] = useState({
    id: '',
    name: '',
  })
  const [checkedAllMap, setCheckedAllMap] = useState<Record<string, boolean>>(
    {}
  )
  const checkboxRefs = useRef<Record<string, HTMLInputElement[]>>({})
  const [hasChecked, setHasChecked] = useState(false)
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroups[]>(
    []
  )

  useEffect(() => {
    setPermissionGroups([
      {
        id: 'permission_1',
        name: 'Equipamentos',
        permissions: [
          {
            id: 'screen_1',
            name: 'Visualizar equipamentos',
            checked: false,
          },
          {
            id: 'screen_2',
            name: 'Atualizar equipamentos',
            checked: Boolean(permissionGroupParams.group),
          },
        ],
      },
      {
        id: 'permission_2',
        name: 'Colaboradores',
        permissions: [
          {
            id: 'screen_3',
            name: 'Visualizar colaboradores',
            checked: Boolean(permissionGroupParams.group),
          },
          {
            id: 'screen_4',
            name: 'Atualizar colaboradores',
            checked: Boolean(permissionGroupParams.group),
          },
        ],
      },
      {
        id: 'permission_3',
        name: 'Usuários',
        permissions: [
          {
            id: 'screen_5',
            name: 'Visualizar usuários',
            checked: Boolean(permissionGroupParams.group),
          },
          {
            id: 'screen_6',
            name: 'Atualizar usuários',
            checked: Boolean(permissionGroupParams.group),
          },
        ],
      },
    ])
  }, [permissionGroupParams.group])

  const handleGroupDataChange = (name: string, value: string | boolean) => {
    setGroupData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateCheckedStatus = () => {
    const anyChecked = Object.values(checkboxRefs.current).some(group =>
      group.some(ref => ref?.checked)
    )
    setHasChecked(anyChecked)
  }

  useEffect(() => {
    if (permissionGroupParams.group) {
      setGroupData({
        id: permissionGroupParams.group,
        name: 'Administrador',
      })
    }

    const interval = setTimeout(() => {
      const newMap: Record<string, boolean> = {}
      for (const group of permissionGroups) {
        const refs = checkboxRefs.current[group.id] || []
        newMap[group.id] = refs.length > 0 && refs.every(ref => ref?.checked)
      }
      setCheckedAllMap(newMap)
    }, 100)
    return () => clearTimeout(interval)
  }, [permissionGroupParams.group, permissionGroups])

  return (
    <div className='flex flex-col justify-center items-center gap-6 px-0.5 w-full h-full overflow-auto'>
      <div className='flex flex-col items-center gap-3 w-full'>
        <h2 className='font-medium text-xl leading-none'>
          {permissionGroupParams.group && 'Editar grupo de permissões'}
          {!permissionGroupParams.group && 'Adicionar novo grupo de permissões'}
        </h2>
        <div className='flex flex-col'>
          <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
            Adicione um novo setor para organizar as áreas principais da
            empresa.
          </span>
        </div>
      </div>

      <div className='gap-3 w-full'>
        <FormInput
          name='name'
          label='Nome'
          required={false}
          type='text'
          value={groupData.name}
          position='right'
          onChange={e => handleGroupDataChange('name', e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-3 divide-y divide-[--border] w-full'>
        {permissionGroups.map(permissionGroup => (
          <div key={permissionGroup.id} className='py-6 w-full'>
            <div className='grid grid-cols-2'>
              <div className='flex justify-start items-start'>
                <div className='flex items-center gap-2'>
                  <input
                    id={permissionGroup.id}
                    type='checkbox'
                    name={`${permissionGroup.id}[]`}
                    className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                    checked={checkedAllMap[permissionGroup.id] || false}
                    onChange={() => {
                      const groupRefs =
                        checkboxRefs.current[permissionGroup.id] || []
                      const newValue = !groupRefs.every(ref => ref?.checked)
                      groupRefs.forEach(ref => {
                        if (ref) ref.checked = newValue
                      })
                      setCheckedAllMap(prev => ({
                        ...prev,
                        [permissionGroup.id]: newValue,
                      }))
                      updateCheckedStatus()
                    }}
                  />
                  <label
                    htmlFor={permissionGroup.id}
                    className='font-medium text-sm select-none'
                  >
                    {permissionGroup.name}
                  </label>
                </div>
              </div>
              <ul className='flex flex-col items-start gap-1'>
                {permissionGroup.permissions.map((permission, j) => (
                  <li key={permission.id}>
                    <div className='flex items-center gap-2 h-full'>
                      <input
                        id={permission.id}
                        ref={el => {
                          if (!checkboxRefs.current[permissionGroup.id]) {
                            checkboxRefs.current[permissionGroup.id] = []
                          }
                          if (
                            el &&
                            !checkboxRefs.current[permissionGroup.id].includes(
                              el
                            )
                          ) {
                            checkboxRefs.current[permissionGroup.id].push(el)
                          }
                        }}
                        type='checkbox'
                        name={`${permissionGroup.id}[]`}
                        onClick={e => {
                          e.stopPropagation()
                        }}
                        checked={permission.checked}
                        onChange={e => {
                          const updatedGroups = permissionGroups.map(group => {
                            if (group.id !== permissionGroup.id) return group
                            return {
                              ...group,
                              permissions: group.permissions.map(p =>
                                p.id === permission.id
                                  ? { ...p, checked: e.target.checked }
                                  : p
                              ),
                            }
                          })
                          setPermissionGroups(updatedGroups)
                          const groupRefs =
                            checkboxRefs.current[permissionGroup.id] || []
                          const allChecked =
                            groupRefs.length > 0 &&
                            groupRefs.every(ref => ref?.checked)
                          setCheckedAllMap(prev => ({
                            ...prev,
                            [permissionGroup.id]: allChecked,
                          }))
                          updateCheckedStatus()
                        }}
                        className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      />

                      <label
                        htmlFor={permission.id}
                        className='font-regular text-sm select-none'
                      >
                        {permission.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-row justify-end w-full'>
        <div className='flex flex-row gap-3'>
          {permissionGroupParams.type === 'editPermissionGroup' && (
            <button
              type='button'
              className='group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
            >
              <TrashIcon
                size='size-4'
                stroke='stroke-[--textSecondary] group-hover:stroke-white'
                strokeWidth={2.5}
              />

              <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
                Excluir
              </span>
            </button>
          )}
          <button
            type='button'
            className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
          >
            <FloppyDiskIcon
              size='size-4'
              stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
              strokeWidth={2.5}
            />
            <span className='font-medium text-sm'>Salvar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
