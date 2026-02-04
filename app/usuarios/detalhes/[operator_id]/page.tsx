'use client'
import { Modal } from '@/components/Display/Modal'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'
import { PasswordInput } from '@/components/Inputs/Password'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { SelectSectors } from '@/components/Inputs/Select/Sector'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { UserSkeleton } from '@/components/Template/Skeletons/User'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { getSectors } from '@/services/Sector'
import {
  deleteUser,
  getPermissionGroups,
  getUser,
  updateUser,
} from '@/services/User'
import { timestampToDateTime } from '@/utils/timestamp-to-datetime'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
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

const OperatorDetails: FC = () => {
  const router = useRouter()
  const params = useParams()
  const OperatorId = Array.isArray(params.operator_id)
    ? params.operator_id[0]
    : params.operator_id
  type OperatorData = {
    name?: string
    email?: string
    password?: string
    permission_group?: string
    created_at: string
    [key: string]: any
  }
  const [operatorData, setOperatorData] = useState<OperatorData>({
    name: '',
    email: '',
    password: '',
    permission_group: '',
    created_at: '',
    sectors: []
  })
  const fetchedUser = useRef(false)
  const fetchedPermissionGroups = useRef(false)
  const [permissionGroups, setPermissionGroups] = useState([])
  const [hasPermission, setHasPermission] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingPermissionGroup, setLoadingPermissionGroup] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])
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
    setOperatorData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangeMulti = <T extends keyof formData>(name: T, value: formData[T]) => {
    setOperatorData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateUser = async () => {
    const response = await updateUser({
      id: OperatorId || '',
      email: operatorData.email?.toLocaleUpperCase() || '',
      name: operatorData.name?.toLocaleUpperCase() || '',
      password: operatorData.password,
      permissionGroup: operatorData.permissionGroup,
      loading: setLoading
    })

    if (response) {
      if (response.status === 200) {
        toast.custom(() => <ToastSuccess text='Usuário atualizado com sucesso' />)
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o usuário' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar o usuário' />
      ))
    }
  }

  const handleDeleteUser = async () => {
    const response = await deleteUser(OperatorId || '')

    if (response) {
      if (response.status === 204) {
        router.push('/usuarios')
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível excluir o usuário' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível excluir o usuário' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedUser.current) return
    fetchedUser.current = true

    const fetchUser = async () => {
      if (OperatorId) {
        const response = await getUser({id: OperatorId, loading: setLoading})

        if (response) {
          if (response.status === 200) {
            setOperatorData(response.data[0])
          } else if (response.status === 403) {
            setHasPermission(false)
          }
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar o usuário' />
          ))
        }
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    fetchSectors()

    if (fetchedPermissionGroups.current) return
    fetchedPermissionGroups.current = true

    const fetchPermissionGroups = async () => {
      const response = await getPermissionGroups({loading: setLoadingPermissionGroup})

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
        <Modal
          title=''
          size='extra-small'
          isModalOpen={modalStatus}
          handleClickOverlay={handleCloseModal}
          showClose={false}
        >
          <div className='flex flex-col gap-2'>
            <span className='font-medium text-xl text-center'>
              Tem certeza que deseja excluir o usuário?
            </span>
            <span className='px-6 text-base text-center'>
              Esta ação é irreversível e todos os dados associados serão
              permanentemente apagados.
            </span>

            <div className='z-[55] flex flex-row justify-center gap-3 pt-6'>
              <button
                type='button'
                onClick={handleDeleteUser}
                className='group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
              >
                <span className='font-medium text-white text-sm transition-all duration-300'>
                  Confirmar
                </span>
              </button>

              <button
                type='button'
                onClick={handleCloseModal}
                className='group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
              >
                <span className='font-medium text-[--textSecondary] text-sm'>
                  Cancelar
                </span>
              </button>
            </div>
          </div>
        </Modal>
        <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
        <AnimatePresence mode='wait'>
        {loading || loadingPermissionGroup
        ? <UserSkeleton/> 
        : 
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
          <div className='flex justify-between items-center gap-3 p-6 w-full'>
            <div className='flex flex-row items-center gap-3'>
              <GoBackButton href='/usuarios' />

              <h2
                className={classNames(
                  { capitalize: operatorData.name },
                  'font-medium text-xl leading-none select-none'
                )}
              >
                {operatorData.name
                  ? operatorData.name.toLocaleLowerCase()
                  : 'Detalhes do usuário'}
              </h2>
            </div>
          </div>

          {(hasPermission && !loading) && (
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
                    value={operatorData.name?.toLocaleLowerCase()}
                    position='right'
                    onChange={e => handleChange('name', e.target.value)}
                    textTransform='capitalize'
                  />

                  <FormInput
                    name='mail'
                    label='E-mail'
                    required={true}
                    type='mail'
                    value={operatorData.email?.toLowerCase()}
                    position='right'
                    onChange={e => handleChange('username', e.target.value)}
                  />

                  <PasswordInput
                    label='Senha'
                    required={false}
                    value={operatorData.password || ''}
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
                    value={operatorData.permission_group}
                    name='Grupo de permissão'
                    options={permissionGroups}
                    required={true}
                    placeholder='Grupo de permissão'
                    onChange={() => null}
                  />

                  <div className='hidden sm:block relative mt-8 mb-4'>
                    <GroupLabel
                      isVisible={true}
                      label={'Responsável'}
                      showFixed={true}
                    />
                  </div>
    
                  <SelectSectors
                    value={operatorData.sectors} 
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

                <div className='flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full'>
                  <div className='flex font-semibold text-[--labelPrimary] text-[10px] uppercase'>
                    Criado em {timestampToDateTime(operatorData.created_at)}
                  </div>
                </div>
              </div>

              <ActionGroup
                onDelete={handleCloseModal}
                onClick={handleUpdateUser}
                showDelete={true}
              />
            </form>
          )}

          {!hasPermission && (
            <PermissionDeniedScreen />
          )}
        </motion.div>
        }
        </AnimatePresence>
        </div>
    </div>
  )
}

export default OperatorDetails
