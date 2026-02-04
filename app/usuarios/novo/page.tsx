'use client'
import { PasswordInput } from '@/components/Inputs/Password'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { SelectSectors } from '@/components/Inputs/Select/Sector'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { getSectors } from '@/services/Sector'
import { createUser, getPermissionGroups } from '@/services/User'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type Sector = {
  uuid: string
  name: string
  sector: string
  created_at: string
  updated_at: string
  subsectors: [],
}

type formData = {
  name: string
  email: string
  password: string
  permissionGroup: string
  sectors: {
    value: string
    label: string
  }[]
}

const CreateOperator: FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissionGroup: '',
    sectors: []
  })
  const fetchedPermissionGroups = useRef(false)
  const [permissionGroups, setPermissionGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSectors, setLoadingSectors] = useState(false)
  const [sectorsData, setSectorsData] = useState<Sector[]>([])
  
  const fetchSectors = async () => {
    const response = await getSectors({loading: setLoadingSectors})

    if (response && response.status === 200) {
      const data = response.data

      setSectorsData(data.data)
    }

    setLoadingSectors(false)
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangeMulti = <T extends keyof formData>(name: T, value: formData[T]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateUser = async () => {
    const response = await createUser({
      email: formData.email?.toLocaleUpperCase(),
      name: formData.name?.toLocaleUpperCase(),
      password: formData.password,
      permissionGroup: formData.permissionGroup,
    })

    if (response) {
      if (response.status === 201) {
        toast.custom(() => <ToastSuccess text='Usuário criado com sucesso' />)
        router.push('/usuarios')
      } else if (response.status === 403) { 
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível criar o usuário. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível criar o usuário. Verifique os campos obrigatórios e tente novamente' />
      ))
    }
  }

  useEffect(() => {
    fetchSectors()
    
    if (fetchedPermissionGroups.current) return
    fetchedPermissionGroups.current = true

    const fetchPermissionGroups = async () => {
      const response = await getPermissionGroups({loading: setLoading})

      if (response && response.status === 200) {
        const filtered = response.data.data.map(
          (item: { name: string; uuid: string }) => ({
            label: item.name,
            value: item.uuid,
          })
        )
        setPermissionGroups(filtered)
      }
    }
    fetchPermissionGroups()
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/usuarios' />

            <h2 className='font-medium text-xl leading-none select-none'>
              Adicionar usuário
            </h2>
          </div>
        </div>

        <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full overflow-y-auto'>
          <div className='gap-4 grid grid-cols-2 h-full'>
            <div className='flex flex-col gap-4 px-6 w-full'>
              <div className='hidden sm:block relative mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Dados do Usuário'}
                  showFixed={true}
                />
              </div>

              <FormInput
                name='name'
                label='Nome'
                required={true}
                type='text'
                value={formData.name.toLocaleLowerCase()}
                position='right'
                onChange={e => handleChange('name', e.target.value)}
                textTransform='capitalize'
              />

              <FormInput
                name='mail'
                label='E-mail'
                required={true}
                type='mail'
                value={formData.email}
                position='right'
                onChange={e => handleChange('email', e.target.value)}
              />

              <PasswordInput
                label='Senha'
                value={formData.password}
                required={true}
                onChange={e => handleChange('password', e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-4 px-6 w-full'>
              <div className='hidden sm:block relative mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Permissões'}
                  showFixed={true}
                />
              </div>

              <SearchSelect
                value={formData.permissionGroup}
                name='permission-groups'
                options={permissionGroups}
                placeholder='Grupo'
                required={true}
                onChange={(value: string) =>
                  handleChange('permissionGroup', value)
                }
              />

              <div className='hidden sm:block relative mt-8 mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Responsável'}
                  showFixed={true}
                />
              </div>

              <SelectSectors
                value={formData.sectors} 
                onChange={(selected) =>
                  handleChangeMulti(
                    'sectors',
                    selected.map(s => ({ value: s.value, label: s.label }))
                  )
                }
                SectorsData={sectorsData}
                background='bg-[--backgroundSecondary]'
              />
            </div>
          </div>

          <ActionGroup onClick={handleCreateUser} showDelete={false} />
        </form>
      </div>
    </div>
  )
}

export default CreateOperator
