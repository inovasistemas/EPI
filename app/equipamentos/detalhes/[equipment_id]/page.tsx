'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useCallback, useEffect, useState } from 'react'
import { ChartLineIcon } from '@/components/Display/Icons/ChartLine'
import { ClockIcon } from '@/components/Display/Icons/Clock'
import { ImageIcon } from '@/components/Display/Icons/Image'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { MaskedInput } from '@/components/Inputs/Masked'
import { useParams, useRouter } from 'next/navigation'
import {
  deleteEquipment,
  getEquipment,
  updateEquipment,
  uploadEquipmentImage,
} from '@/services/Equipment'
import { convertMoneyBRL } from '@/utils/convert-money-brl'
import { convertNumberDB } from '@/utils/convert-number-db'
import { Modal } from '@/components/Display/Modal'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { SecondaryButton } from '@/components/Buttons/SecondaryButton'
import { FactoryIcon } from '@/components/Display/Icons/Factory'
import { WorkflowSquareIcon } from '@/components/Display/Icons/WorkflowSquare'
import { Manufacturer } from '@/components/Features/Manufacturer'
import { Category } from '@/components/Features/Category'
import { SelectCategories } from '@/components/Inputs/Select/Categories'
import { SelectManufacturers } from '@/components/Inputs/Select/Manufacturer'
import ImageUpload from '@/components/ImageUpload'
import { PermissionDeniedScreen } from '@/components/Features/PermissionDenied'

enum menus {
  Manufacturer,
  Category,
  Default,
}

const CreateEquipment: FC = () => {
  const [categoryVersion, setCategoryVersion] = useState(0)
  const [manufacturerVersion, setManufacturerVersion] = useState(9999)
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()
  const params = useParams()
  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [activeRegisterModal, setActiveRegisterModal] = useState(menus.Default)
  const EquipmentId = Array.isArray(params.equipment_id)
    ? params.equipment_id[0]
    : params.equipment_id
  const [equipmentData, setEquipmentData] = useState<EquipmentServiceDetails>({
    uuid: '',
    abc_classification: '',
    additional_code: '',
    approval_certification: '',
    category: '',
    composition: '',
    cost: undefined,
    details: '',
    dimensions: '',
    disposable: true,
    ean: '',
    expiration_date: '',
    family: '',
    manufacturer: '',
    measure: '',
    name: '',
    picture: null,
    price: undefined,
    stock: undefined,
    stock_control: true,
    stock_location: '',
    stock_maximum: undefined,
    stock_minimum: undefined,
    weight: '',
    weight_measure: '',
  })
  const [hasPermission, setHasPermission] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const handleCloseModal = useCallback(() => {
    setModalStatus(prev => !prev)
  }, [])

  const handleActiveRegisterModal = (menu: menus) => {
    setActiveRegisterModal(menu)
    handleCloseCreateModal()
  }

  const handleUpload = async (id: string, fileToUpload?: File) => {
    const fileData = fileToUpload || file

    if (!fileData) {
      toast.custom(() => <ToastError text='Selecione uma imagem' />)
      return
    }
    setLoading(true)

    const response = await uploadEquipmentImage({ id, file: fileData })

    if (response?.status !== 201) {
      toast.custom(() => <ToastError text='Não foi possível salvar a imagem' />)
    }

    setLoading(false)
  }

  const handleChange = (
    name: string,
    value: string | number | boolean | null
  ) => {
    setEquipmentData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const fetchEquipment = async () => {
    if (EquipmentId) {
      const response = await getEquipment({
        loading: setLoading,
        id: EquipmentId,
      })

      if (response) {
        if (response.status === 200) {
          setEquipmentData(response.data[0])
        } else if (response.status === 403) {
          setHasPermission(false)
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar o equipamento' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar o equipamento' />
        ))
      }
      
    }
  }

  const handleUpdateEquipment = async () => {
    const response = await updateEquipment({
      loading: setLoading,
      id: Array.isArray(EquipmentId) ? EquipmentId[0] : EquipmentId || '',
      ...equipmentData,
      picture: file ? equipmentData.picture : null,
    })

    if (response) {
      if (response.status === 200) {
        if (response.data.uuid && file) {
          await handleUpload(response.data.uuid, file)
        }

        toast.custom(() => (
          <ToastSuccess text='Equipamento atualizado com sucesso' />
        ))
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar o equipamento' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar o equipamento' />
      ))
    }

    
  }

  const handleDeleteEquipment = async () => {
    const response = await deleteEquipment({
      loading: setLoading,
      id: Array.isArray(EquipmentId) ? EquipmentId[0] : EquipmentId || '',
    })

    if (response) {
      if (response.status === 204) {
        router.push('/equipamentos')
      } else if (response.status === 403) {
        toast.custom(() => (
          <ToastError text='Você não possui permissão para esta ação' />
        )) 
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível excluir o equipamento' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível excluir o equipamento' />
      ))
    }
  }

  const handleCloseCreateModal = useCallback(() => {
    setCreateModalStatus(prev => !prev)

    if (createModalStatus) {
      if (activeRegisterModal === menus.Category) {
        setCategoryVersion(prev => prev + 1)
      }

      if (activeRegisterModal === menus.Manufacturer) {
        setManufacturerVersion(prev => prev + 1)
      }

      setActiveRegisterModal(menus.Default)
    }
  }, [createModalStatus, activeRegisterModal])

  useEffect(() => {
    fetchEquipment()
  }, [])

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      <Modal
        title='Categorias e subcategorias'
        isModalOpen={createModalStatus}
        padding={false}
        handleClickOverlay={handleCloseCreateModal}
      >
        <div className='-mt-6 min-w-[48rem] min-h-96 overflow-auto overflow-y-auto'>
          {activeRegisterModal === menus.Manufacturer && <Manufacturer />}
          {activeRegisterModal === menus.Category && <Category />}
        </div>
      </Modal>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleCloseModal}
        showClose={false}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-medium text-xl text-center'>
            Tem certeza que deseja excluir o equipamento?
          </span>
          <span className='px-6 text-base text-center'>
            Esta ação é irreversível e todos os dados associados serão
            permanentemente apagados.
          </span>

          <div className='z-[55] flex flex-row justify-center gap-3 pt-6'>
            <button
              type='button'
              onClick={handleDeleteEquipment}
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
      <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full overflow-auto'>
        <div className='flex justify-between items-center gap-3 p-6 w-full'>
          <div className='flex flex-row items-center gap-3'>
            <GoBackButton href='/equipamentos' />

            <h2 className='font-medium text-xl capitalize leading-none select-none'>
              {equipmentData.name
                ? equipmentData.name.toLocaleLowerCase()
                : 'Detalhes do equipamento'}
            </h2>
          </div>

          {(hasPermission && !loading) && (
          <div className='flex flex-row items-center gap-2'>
            <SecondaryButton
              label='Fabricantes'
              icon={
                <FactoryIcon
                  size='size-4'
                  stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              onClick={() => handleActiveRegisterModal(menus.Manufacturer)}
            />

            <SecondaryButton
              label='Categorias'
              icon={
                <WorkflowSquareIcon
                  size='size-4'
                  stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
              }
              onClick={() => handleActiveRegisterModal(menus.Category)}
            />
          </div>
          )}

          {/* <div className='flex items-center gap-3'>
            <button
              type='button'
              className='flex justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-xl w-8 aspect-square font-medium text-[10px] transition-all duration-300'
            >
              {equipmentData.abc_classification === 'A' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  A
                </span>
              ) : equipmentData.abc_classification === 'B' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  B
                </span>
              ) : equipmentData.abc_classification === 'C' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  C
                </span>
              ) : (
                <ChartLineIcon
                  size='size-5'
                  stroke='stroke-[--textSecondary]'
                />
              )}
            </button>

            <button
              type='button'
              className='flex justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-xl w-8 aspect-square font-medium text-[10px] transition-all duration-300'
            >
              <ClockIcon
                size='size-4'
                stroke='stroke-[--textSecondary]'
                strokeWidth={2.5}
              />
            </button>
          </div> */}
        </div>

        {(hasPermission && !loading) && (
          <div className='relative gap-y-10 grid w-full'>
            <div className='flex flex-row gap-4 px-6 w-full'>
              <div>
                <ImageUpload
                  file={file}
                  setFile={setFile}
                  picture={
                    equipmentData.picture &&
                    `http://localhost:3333${equipmentData.picture}`
                  }
                />
                {/* <button
                  type='button'
                  className='flex justify-center items-center bg-[--backgroundSecondary] hover:opacity-70 border-[--border] border-2 border-dashed rounded-2xl w-32 aspect-square transition-all duration-300'
                >
                  <ImageIcon
                    size='size-10'
                    stroke='stroke-[--buttonSecondary]'
                    strokeWidth={1.5}
                  />
                </button> */}
              </div>

              <div className='gap-4 grid grid-cols-2 w-full'>
                <FormInput
                  name='name'
                  label='Nome'
                  required={true}
                  type='text'
                  value={equipmentData.name?.toLocaleLowerCase()}
                  position='right'
                  textTransform='capitalize'
                  onChange={e => handleChange('name', e.target.value)}
                />

                <FormInput
                  name='ean'
                  label='EAN'
                  required={false}
                  type='text'
                  value={equipmentData.ean}
                  position='right'
                  onChange={e => handleChange('ean', e.target.value)}
                />

                <div className='gap-3 grid grid-cols-2'>
                  <MaskedInput
                    name='cost'
                    label='Valor de custo'
                    required={false}
                    type='money'
                    value={convertMoneyBRL(equipmentData.cost ?? 0)}
                    position='right'
                    onChange={e =>
                      handleChange('cost', convertNumberDB(e.target.value))
                    }
                  />

                  <SearchSelect
                    value={equipmentData.measure}
                    name='measure'
                    options={[
                      { value: 'un', label: 'Unidade' },
                      { value: 'cx', label: 'Caixa' },
                      { value: 'pct', label: 'Pacote' },
                      { value: 'kit', label: 'Kit' },
                      { value: 'par', label: 'Par' },
                      { value: 'dz', label: 'Dúzia' },
                      { value: 'rl', label: 'Rolo' },
                      { value: 'fr', label: 'Frasco' },
                      { value: 'gl', label: 'Galão' },
                      { value: 'lt', label: 'Lata' },
                      { value: 'sc', label: 'Saco' },
                      { value: 'amp', label: 'Ampola' },
                      { value: 'tb', label: 'Tubete' },
                      { value: 'bl', label: 'Blister' },
                      { value: 'ctl', label: 'Cartela' },
                      { value: 'md', label: 'Módulo' },
                      { value: 'm', label: 'Metro' },
                      { value: 'bob', label: 'Bobina' },
                      { value: 'fl', label: 'Folha' },
                      { value: 'ctn', label: 'Contentor' },
                      { value: 'cxm', label: 'Caçamba' },
                      { value: 'jg', label: 'Jogo' },
                      { value: 'pç', label: 'Peça' },
                      { value: 'sr', label: 'Seringa' },
                      { value: 'cxk', label: 'Caixa (Kit)' },
                      { value: 'bld', label: 'Balde' },
                      { value: 'barr', label: 'Barrica' },
                      { value: 'cp', label: 'Cápsula' },
                      { value: 'en', label: 'Envelope' },
                      { value: 'pa', label: 'Pallet' },
                      { value: 'ct', label: 'Cartucho' },
                      { value: 'ctg', label: 'Cartucho (Gás)' },
                    ]}
                    placeholder='Unidade medida'
                    required={true}
                    onChange={(value: string) => handleChange('measure', value)}
                  />
                </div>

                <div className='block items-center w-full'>
                  <SearchSelect
                    value={equipmentData.disposable ? 'true' : 'false'}
                    name='measure'
                    options={[
                      { value: 'false', label: 'Reutilizável' },
                      { value: 'true', label: 'Não reutilizável' },
                    ]}
                    placeholder='Unidade medida'
                    onChange={() => null}
                  />
                </div>
              </div>
            </div>

            <div className='gap-4 grid sm:grid-cols-1 px-6 w-full'>
              <div className='grid sm:grid-cols-1 w-full'>
                <div className='relative flex flex-row justify-between items-center col-span-full mb-4 w-full'>
                  <div className='flex flex-row items-center gap-1'>
                    <input
                      id='stockControl'
                      type='checkbox'
                      name='stockControl'
                      className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      checked={equipmentData.stock_control}
                      onChange={e =>
                        handleChange('stock_control', e.target.checked)
                      }
                    />
                    <label
                      htmlFor='stockControl'
                      className='hidden sm:block top-0 left-0 relative px-1 font-semibold text-[--labelPrimary] text-[10px] uppercase whitespace-nowrap transition-all duration-300 select-none'
                    >
                      Controlar estoque
                    </label>
                  </div>
                </div>
                <div className='gap-4 grid sm:grid-cols-5 w-full'>
                  <AnimatePresence>
                    {equipmentData.stock_control && (
                      <motion.div
                        key='motion.div'
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => null}
                        className='gap-4 grid sm:grid-cols-3 col-span-3 w-full'
                      >
                        <MaskedInput
                          name='stock'
                          label='Estoque'
                          required={true}
                          type='number'
                          value={equipmentData.stock}
                          position='right'
                          onChange={e =>
                            handleChange('stock', convertNumberDB(e.target.value))
                          }
                        />

                        <MaskedInput
                          name='stock_minimum'
                          label='Estoque mínimo'
                          required={false}
                          type='number'
                          value={equipmentData.stock_minimum}
                          position='right'
                          onChange={e =>
                            handleChange(
                              'stock_minimum',
                              convertNumberDB(e.target.value)
                            )
                          }
                        />

                        <MaskedInput
                          name='stock_maximum'
                          label='Estoque máximo'
                          required={false}
                          type='number'
                          value={equipmentData.stock_maximum}
                          position='right'
                          onChange={e =>
                            handleChange(
                              'stock_maximum',
                              convertNumberDB(e.target.value)
                            )
                          }
                        />
                      </motion.div>
                    )}
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className='col-span-2'
                    >
                      <FormInput
                        name='stock_location'
                        label='Localização'
                        required={false}
                        type='text'
                        value={equipmentData.stock_location}
                        position='right'
                        onChange={e =>
                          handleChange('stock_location', e.target.value)
                        }
                      />
                    </motion.div>

                    <motion.div
                      key='dimensions'
                      layout
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      className='col-span-1'
                    >
                      <FormInput
                        name='dimensions'
                        label='Dimensões'
                        required={false}
                        type='text'
                        value={equipmentData.dimensions}
                        position='right'
                        onChange={e => handleChange('dimensions', e.target.value)}
                      />
                    </motion.div>

                    <motion.div
                      className='col-span-3'
                      key='weight'
                      layout
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className='gap-4 grid grid-cols-2'>
                        <div className='col-span-1'>
                          <FormInput
                            name='weight'
                            label='Peso'
                            required={false}
                            type='text'
                            value={equipmentData.weight}
                            position='right'
                            onChange={e => handleChange('weight', e.target.value)}
                          />
                        </div>

                        <SearchSelect
                          value={equipmentData.weight_measure}
                          name='weight_measure'
                          options={[
                            { value: 'kg', label: 'Quilograma (kg)' },
                            { value: 'g', label: 'Grama (g)' },
                            { value: 'mg', label: 'Miligrama (mg)' },
                            { value: 't', label: 'Tonelada (t)' },
                            { value: 'lb', label: 'Libra (lb)' },
                            { value: 'oz', label: 'Onça (oz)' },
                            { value: 'ct', label: 'Quilate (ct)' },
                            { value: 'ug', label: 'Micrograma (µg)' },
                            { value: 'dg', label: 'Decigrama (dg)' },
                            { value: 'hg', label: 'Hectograma (hg)' },
                            { value: 'st', label: 'Stone (st)' },
                            { value: 'mt', label: 'Métrica Tona (t)' },
                            { value: 'lt', label: 'Long Ton (ton longa)' },
                            { value: 'swt', label: 'Short Ton (ton curta)' },
                            { value: 'dr', label: 'Dram (dr)' }
                          ]}
                          placeholder='Medida'
                          onChange={(value: string) =>
                            handleChange('weight_measure', value)
                          }
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className='gap-4 grid grid-cols-3 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Categorias'}
                  showFixed={true}
                />
              </div>

              <SelectCategories
                key={categoryVersion}
                value={equipmentData.category ?? ''}
                onChange={(value: string) => handleChange('category', value)}
              />

              {/* <SearchSelect
                value={equipmentData.family}
                name='subcategory'
                options={[
                  { value: 'family1', label: 'Família 1' },
                  { value: 'family2', label: 'Família 2' },
                ]}
                placeholder='Subcategoria'
                onChange={(value: string) => handleChange('family', value)}
              /> */}

              <SelectManufacturers
                key={manufacturerVersion}
                value={equipmentData.manufacturer ?? ''}
                onChange={(value: string) => handleChange('manufacturer', value)}
              />
            </div>

            <div className='gap-4 grid grid-cols-2 px-6 w-full'>
              <div className='hidden sm:block relative col-span-full mb-4'>
                <GroupLabel
                  isVisible={true}
                  label={'Informações adicionais'}
                  showFixed={true}
                />
              </div>

              <TextArea
                value={equipmentData.details || ''}
                onChange={e => handleChange('details', e.target.value)}
                name='details'
                required={false}
                label='Detalhes'
              />

              <TextArea
                value={equipmentData.composition || ''}
                onChange={e => handleChange('composition', e.target.value)}
                name='composition'
                required={false}
                label='Composição'
              />

              <FormInput
                name='approval_certification'
                label='Certificado aprovação'
                required={false}
                type='text'
                value={equipmentData.approval_certification}
                position='right'
                onChange={e =>
                  handleChange('approval_certification', e.target.value)
                }
              />

              <div className='gap-4 grid grid-cols-2'>
                <FormInput
                  name='additional_code'
                  label='Código'
                  required={false}
                  type='text'
                  value={equipmentData.additional_code}
                  position='right'
                  onChange={e => handleChange('additional_code', e.target.value)}
                />

                <MaskedInput
                  name='expiration_date'
                  label='Data expiração'
                  required={false}
                  type='date'
                  value={equipmentData.expiration_date}
                  position='right'
                  onChange={e => handleChange('expiration_date', e.target.value)}
                />
              </div>
            </div>

            <ActionGroup
              onDelete={handleCloseModal}
              uriBack='/equipamentos'
              showDelete={true}
              onClick={handleUpdateEquipment}
            />
          </div>
        )}
        {!hasPermission && (
          <PermissionDeniedScreen />
        )}
      </div>
    </div>
  )
}

export default CreateEquipment
