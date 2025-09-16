'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useState } from 'react'
import { ChartLineIcon } from '@/components/Display/Icons/ChartLine'
import { ImageIcon } from '@/components/Display/Icons/Image'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { useParams, useRouter } from 'next/navigation'
import { MaskedInput } from '@/components/Inputs/Masked'
import { convertNumberDB } from '@/utils/convert-number-db'
import { convertMoneyBRL } from '@/utils/convert-money-brl'
import { createEquipment } from '@/services/Equipment'
import { toast } from 'sonner'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { ToastError } from '@/components/Template/Toast/Error'

const CreateEquipment: FC = () => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [equipmentData, setEquipmentData] = useState<EquipmentServiceDetails>({
    uuid: '',
    abc_classification: '',
    additional_code: '',
    approval_certification: '',
    category: '',
    composition: '',
    cost: 0,
    details: '',
    dimensions: '',
    disposable: false,
    ean: '',
    expiration_date: '',
    family: '',
    manufacturer: '',
    measure: '',
    name: '',
    picture: '',
    price: 0,
    stock: 0,
    stock_control: true,
    stock_location: '',
    stock_maximum: 0,
    stock_minimum: 0,
    weight: '',
    weight_measure: '',
  })

  const handleCreateEquipment = async () => {
    const response = await createEquipment({
      loading: setLoading,
      ...equipmentData,
    })

    if (response && response.status === 201) {
      toast.custom(() => <ToastSuccess text='Equipamento criado com sucesso' />)
      router.push('/equipamentos')
    } else {
      toast.custom(() => <ToastError text='Erro ao criar equipamento' />)
    }
  }

  const handleChange = (name: string, value: string | number | boolean) => {
    setEquipmentData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
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
        </div>

        <form className='relative gap-y-10 grid w-full'>
          <div className='flex flex-row gap-4 px-6 w-full'>
            <div>
              <button
                type='button'
                className='flex justify-center items-center bg-[--backgroundSecondary] hover:opacity-70 border-[--border] border-2 border-dashed rounded-2xl w-32 aspect-square transition-all duration-300'
              >
                <ImageIcon
                  size='size-10'
                  stroke='stroke-[--buttonSecondary]'
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className='gap-4 grid grid-cols-2 w-full'>
              <FormInput
                name='name'
                label='Nome'
                required={false}
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
                  ]}
                  placeholder='Unidade medida'
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
                        required={false}
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
                    <SearchSelect
                      value={equipmentData.stock_location}
                      name='stock_location'
                      options={[
                        { value: 'lc1', label: 'Local 1' },
                        { value: 'lc2', label: 'Local 2' },
                      ]}
                      placeholder='Localização'
                      onChange={(value: string) =>
                        handleChange('stock_location', value)
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
                    className='col-span-2'
                    key='weight'
                    layout
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='gap-4 grid grid-cols-3'>
                      <div className='col-span-2'>
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
                          { value: 'kg', label: 'Kg' },
                          { value: 'lb', label: 'Lb' },
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

            <SearchSelect
              value={equipmentData.category}
              name='category'
              options={[
                { value: 'category1', label: 'Categoria 1' },
                { value: 'category2', label: 'Categoria 2' },
              ]}
              placeholder='Categoria'
              onChange={(value: string) => handleChange('category', value)}
            />

            <SearchSelect
              value={equipmentData.family}
              name='family'
              options={[
                { value: 'family1', label: 'Família 1' },
                { value: 'family2', label: 'Família 2' },
              ]}
              placeholder='Família'
              onChange={(value: string) => handleChange('family', value)}
            />

            <SearchSelect
              value={equipmentData.manufacturer}
              name='manufacturer'
              options={[
                { value: 'manufacturer1', label: 'Fabricante 1' },
                { value: 'manufacturer2', label: 'Fabricante 2' },
              ]}
              placeholder='Fabricante'
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
              value={equipmentData.details}
              onChange={e => handleChange('details', e.target.value)}
              name='details'
              required={false}
              label='Detalhes'
            />

            <TextArea
              value={equipmentData.composition}
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
            uriBack='/equipamentos'
            showDelete={false}
            onClick={handleCreateEquipment}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateEquipment
