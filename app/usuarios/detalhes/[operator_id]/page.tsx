'use client'
import { useParams, useRouter } from 'next/navigation'
import { type FC, useEffect, useRef, useState, useCallback } from 'react'
import { PasswordInput } from '@/components/Inputs/Password'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import {
  deleteUser,
  getPermissionGroups,
  getUser,
  updateUser,
} from '@/services/User'
import { timestampToDateTime } from '@/utils/timestamp-to-datetime'
import classNames from 'classnames'
import { toast } from 'sonner'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { ToastError } from '@/components/Template/Toast/Error'
import { Modal } from '@/components/Display/Modal'

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
  })
  const fetchedUser = useRef(false)
  const fetchedPermissionGroups = useRef(false)
  const [permissionGroups, setPermissionGroups] = useState([])

  const [modalStatus, setModalStatus] = useState(false)
  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handleChange = (name: string, value: string) => {
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
    })

    if (response && response.status === 200) {
      toast.custom(() => <ToastSuccess text="Usuário atualizado com sucesso" />)
    } else {
      toast.custom(() => <ToastError text="Erro ao atualizar o usuário" />)
    }
  }

  const handleDeleteUser = async () => {
    const response = await deleteUser(OperatorId || '')

    if (response && response.status === 204) {
      router.push('/usuarios')
    } else {
      toast.custom(() => <ToastError text="Erro ao buscar dados do usuário" />)
    }
  }

  useEffect(() => {
    if (fetchedUser.current) return
    fetchedUser.current = true

    const fetchUser = async () => {
      if (OperatorId) {
        const response = await getUser(OperatorId)

        if (response && response.status === 200) {
          setOperatorData(response.data[0])
        }
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (fetchedPermissionGroups.current) return
    fetchedPermissionGroups.current = true

    const fetchPermissionGroups = async () => {
      const response = await getPermissionGroups()

      if (response && response.status === 200) {
        const filtered = response.data.data.map(
          (item: { name: string; uuid: string }) => ({
            label: item.name,
            value: item.uuid,
          }),
        )
        setPermissionGroups(filtered)
      }
    }
    fetchPermissionGroups()
  }, [])

  return (
    <div
      className="flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto">
      <Modal
        title=""
        size="extra-small"
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        showClose={false}
      >
        <div className="flex flex-col gap-2">
          <span className="font-medium text-xl text-center">
            Tem certeza que deseja excluir o usuário?
          </span>
          <span className="px-6 text-base text-center">
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className="z-[55] flex flex-row justify-center gap-3 pt-6">
            <button
              type="button"
              onClick={handleDeleteUser}
              className="group select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--errorLoader] rounded-xl h-10 text-white transition-all duration-300 px-8"
            >
              <span className="font-medium text-white text-sm transition-all duration-300">
                Confirmar
              </span>
            </button>

            <button
              type="button"
              onClick={handleCloseModal}
              className="select-none active:scale-95 z-[55] cursor-pointer flex gap-3 group relative justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-xl h-10 text-white transition-all duration-300 px-8"
            >
            <span className="font-medium text-[--textSecondary] text-sm">
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <div className="relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full">
        <div className="flex justify-between items-center gap-3 p-6 w-full">
          <div className="flex flex-row items-center gap-3">
            <GoBackButton href="/usuarios" />

            <h2
              className={classNames(
                { capitalize: operatorData.name },
                'font-medium text-xl leading-none select-none',
              )}
            >
              {operatorData.name
                ? operatorData.name.toLocaleLowerCase()
                : 'Detalhes do usuário'}
            </h2>
          </div>
        </div>

        <form className="flex flex-col gap-x-4 gap-y-10 w-full h-full overflow-y-auto">
          <div className="gap-4 grid grid-cols-2 h-full">
            <div className="flex flex-col gap-4 px-6 w-full">
              <div className="hidden sm:block relative mb-4">
                <GroupLabel
                  isVisible={true}
                  label={'Dados do Usuário'}
                  showFixed={true}
                />
              </div>

              <FormInput
                name="name"
                label="Nome"
                required={false}
                type="text"
                value={operatorData.name?.toLocaleLowerCase()}
                position="right"
                onChange={e => handleChange('name', e.target.value)}
                textTransform="capitalize"
              />

              <FormInput
                name="mail"
                label="E-mail"
                required={false}
                type="mail"
                value={operatorData.email?.toLowerCase()}
                position="right"
                onChange={e => handleChange('username', e.target.value)}
              />

              <PasswordInput
                label="Senha"
                value={operatorData.password || ''}
                onChange={e => handleChange('password', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 px-6 w-full">
              <div className="hidden sm:block relative mb-4">
                <GroupLabel
                  isVisible={true}
                  label={'Permissões'}
                  showFixed={true}
                />
              </div>

              <SearchSelect
                value={operatorData.permission_group}
                name="Grupo de permissão"
                options={permissionGroups}
                placeholder="Grupo de permissão"
                onChange={() => null}
              />
            </div>

            <div className="flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full">
              <div className="flex font-semibold text-[--labelPrimary] text-[10px] uppercase">
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
      </div>
    </div>
  )
}

export default OperatorDetails
