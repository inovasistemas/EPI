'use client'
import { useParams } from 'next/navigation'
import { type FC, useEffect, useRef, useState, useCallback } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { getCollaborator } from '@/services/Collaborator'
import { timestampToDateTime } from '@/utils/timestamp-to-datetime'
import { MaskedInput } from '@/components/Inputs/Masked'
import { SelectJobPositions } from '@/components/Inputs/Select/JobPositions'
import { Modal } from '@/components/Display/Modal'

type Collaborator = {
  name: string
  birthdate: string
  rg: string
  cpf: string
  gender: string
  job_position: string
  admission_date: string
  zip_code: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  phone: string
  observations: string
  created_at: string
}

const CollaboratorDetails: FC = () => {
  const params = useParams()
  const CollaboratorId = params?.collaborator_id
  const [loading, setLoading] = useState(false)
  const [collaborator, setCollaborator] = useState<Collaborator>({
    name: '',
    birthdate: '',
    rg: '',
    cpf: '',
    gender: '',
    job_position: '',
    admission_date: '',
    zip_code: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    observations: '',
    created_at: '',
  })
  const fetchedCollaborator = useRef(false)

  const handleChange = (name: string, value: string) => {
    setCollaborator(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchCollaborator = async () => {
    if (CollaboratorId && typeof CollaboratorId === 'string') {
      const response = await getCollaborator({
        loading: setLoading,
        id: CollaboratorId,
      })

      if (response && response.status === 200) {
        setCollaborator(response.data)
      } else {
        toast.custom(() => <ToastError text="Erro ao buscar colaborador" />)
      }

      fetchedCollaborator.current = true
    }
  }

  const [modalStatus, setModalStatus] = useState(false)
  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const updateCollabroator = async () => {
    console.log(collaborator)
  }

  const deleteCollaborator = async () => {
    alert('deletar')
  }

  useEffect(() => {
    if ((!CollaboratorId || typeof CollaboratorId !== 'string') && fetchedCollaborator) return
    fetchCollaborator().then()
  }, [CollaboratorId, fetchedCollaborator])

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
            Tem certeza que deseja excluir o colaborador?
          </span>
          <span className="px-6 text-base text-center">
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className="flex flex-row justify-center gap-3 pt-6">
            <button
              type="button"
              onClick={deleteCollaborator}
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
            <GoBackButton href="/colaboradores" />

            <h2 className="font-medium text-xl capitalize leading-none select-none">
              {collaborator?.name
                ? collaborator?.name.toLocaleLowerCase()
                : 'Detalhes do colaborador'}
            </h2>
          </div>
        </div>

        <form className="gap-x-4 gap-y-10 grid sm:grid-cols-1 w-full overflow-y-auto">
          <div className="gap-4 grid sm:grid-cols-3 px-6 w-full">
            <div className="hidden sm:block relative col-span-full mb-4">
              <GroupLabel
                isVisible={true}
                label={'Dados do Colaborador'}
                showFixed={true}
              />
            </div>

            <div className="col-span-2">
              <FormInput
                name="name"
                label="Nome"
                required={false}
                type="text"
                value={collaborator?.name.toLocaleLowerCase()}
                position="right"
                onChange={e => handleChange('name', e.target.value)}
                textTransform="capitalize"
              />
            </div>

            <MaskedInput
              name="birthdate"
              label="Data de nascimento"
              required={false}
              type="date"
              value={collaborator?.birthdate}
              position="right"
              onChange={e => handleChange('birthdate', e.target.value)}
            />

            <MaskedInput
              name="rg"
              label="RG"
              required={false}
              type="rg"
              value={collaborator?.rg}
              position="right"
              onChange={e => handleChange('rg', e.target.value)}
            />

            <MaskedInput
              name="cpf"
              label="CPF"
              required={false}
              type="cpf"
              value={collaborator?.cpf}
              position="right"
              onChange={e => handleChange('cpf', e.target.value)}
            />

            <SearchSelect
              name="gender"
              value={collaborator?.gender}
              options={[
                { value: 'FEMALE', label: 'Feminino' },
                { value: 'MALE', label: 'Masculino' },
                { value: 'NOTINFORMED', label: 'Não informado' },
              ]}
              placeholder="Gênero"
              onChange={() => null}
            />
          </div>

          <div className="gap-4 grid grid-cols-2 px-6 w-full">
            <div className="hidden sm:block relative col-span-full mb-4">
              <GroupLabel
                isVisible={true}
                label={'Dados sobre Cargo'}
                showFixed={true}
              />
            </div>

            <SelectJobPositions value={collaborator?.job_position} />

            <MaskedInput
              name="admission_date"
              label="Data de admissão"
              required={false}
              type="date"
              value={collaborator?.admission_date}
              position="right"
              onChange={e => handleChange('admission_date', e.target.value)}
            />
          </div>

          <div className="gap-4 grid grid-cols-3 px-6 w-full">
            <div className="hidden sm:block relative col-span-full mb-4">
              <GroupLabel
                isVisible={true}
                label={'Dados de Contato'}
                showFixed={true}
              />
            </div>

            <MaskedInput
              name="zip_code"
              label="CEP"
              required={false}
              type="zipcode"
              value={collaborator?.zip_code}
              position="right"
              onChange={e => handleChange('zip_code', e.target.value)}
            />

            <div className="gap-4 grid grid-cols-3 col-span-2 w-full">
              <div className="col-span-2">
                <FormInput
                  name="address"
                  label="Endereço"
                  required={false}
                  type="text"
                  value={collaborator?.address}
                  position="right"
                  onChange={e => handleChange('address', e.target.value)}
                />
              </div>

              <FormInput
                name="number"
                label="Número"
                required={false}
                type="text"
                value={collaborator?.number}
                position="right"
                onChange={e => handleChange('number', e.target.value)}
              />
            </div>

            <FormInput
              name="neighborhood"
              label="Bairro"
              required={false}
              type="text"
              value={collaborator?.neighborhood}
              position="right"
              onChange={e => handleChange('neighborhood', e.target.value)}
            />

            <div className="gap-4 grid grid-cols-3 col-span-2 w-full">
              <div className="col-span-2">
                <FormInput
                  name="city"
                  label="Cidade"
                  required={false}
                  type="text"
                  value={collaborator?.city}
                  position="right"
                  onChange={e => handleChange('city', e.target.value)}
                />
              </div>
              <FormInput
                name="state"
                label="UF"
                required={false}
                type="text"
                value={collaborator?.state}
                position="right"
                onChange={e => handleChange('state', e.target.value)}
                maxLength={2}
              />
            </div>

            <MaskedInput
              name="phone"
              label="Celular"
              required={false}
              type="phone"
              value={collaborator?.phone}
              position="right"
              onChange={e => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="gap-4 grid sm:grid-cols-2 px-6 w-full">
            <div className="hidden sm:block relative col-span-full mb-4">
              <GroupLabel
                isVisible={true}
                label={'Observações'}
                showFixed={true}
              />
            </div>
            <TextArea
              value={collaborator?.observations}
              onChange={e => handleChange('observations', e.target.value)}
              name="observations"
              required={false}
              label="Observações"
            />
          </div>

          <div className="flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full">
            <div className="flex font-semibold text-[--labelPrimary] text-[10px] uppercase">
              Criado em {timestampToDateTime(collaborator?.created_at)}
            </div>
          </div>

          <ActionGroup uriBack="/colaboradores"
                       onDelete={deleteCollaborator}
                       onClick={updateCollabroator}
                       showDelete={true} />
        </form>
      </div>
    </div>
  )
}

export default CollaboratorDetails
