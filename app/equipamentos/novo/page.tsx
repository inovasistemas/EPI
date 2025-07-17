'use client'
import { Image, TrendUp } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useState } from 'react'
import { SearchSelect } from '@/components/Inputs/Select/SearchSelect'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { TextArea } from '@/components/Inputs/Text/TextArea'
import { GoBackButton } from '@/components/Navigation/GoBackButton'
import { ActionGroup } from '@/components/Surfaces/ActionGroup'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'

const CreateEquipment: FC = () => {
  const [equipmentData, setEquipmentData] = useState({
    abcClassification: '',
    additionalCode: '',
    approvalCertification: '',
    category: '',
    composition: '',
    cost: '',
    details: '',
    dimensions: '',
    disposable: false,
    ean: '',
    expirationDate: '',
    family: '',
    manufacturer: '',
    measure: 'un',
    name: '',
    picture: '',
    price: '',
    stock: '',
    stockControl: true,
    stockLocation: '',
    stockMaximum: '',
    stockMinimum: '',
    weight: '',
    weightMeasure: 'kg',
  })

  const handleChange = (name: string, value: string) => {
    setEquipmentData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangeBool = (name: string, value: boolean) => {
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

            <h2 className='font-medium text-2xl leading-none select-none'>
              Adicionar equipamento
            </h2>
          </div>

          <div>
            <button
              type='button'
              className='flex justify-center items-center bg-[--buttonPrimary] hover:bg-[--buttonSecondary] rounded-lg w-8 aspect-square font-medium text-[10px] transition-all duration-300'
            >
              {equipmentData.abcClassification === 'A' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  A
                </span>
              ) : equipmentData.abcClassification === 'B' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  B
                </span>
              ) : equipmentData.abcClassification === 'C' ? (
                <span className='font-medium text-[--textSecondary] text-base'>
                  C
                </span>
              ) : (
                <TrendUp
                  size={18}
                  weight='bold'
                  className='text-[--textSecondary]'
                />
              )}
            </button>
          </div>
        </div>

        <form className='relative gap-y-10 grid w-full'>
          <div className='flex flex-row gap-4 px-6 w-full'>
            <div>
              <button
                type='button'
                className='flex justify-center items-center bg-[--backgroundSecondary] hover:opacity-70 border-[--border] border-2 border-dashed rounded-2xl w-32 aspect-square transition-all duration-300'
              >
                <Image
                  size={38}
                  weight='regular'
                  className='opacity-50 text-[--textSecondary] select-none'
                />
              </button>
            </div>

            <div className='gap-4 grid grid-cols-2 w-full'>
              <FormInput
                name='name'
                label='Nome'
                required={false}
                type='text'
                value={equipmentData.name}
                position='right'
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
                <FormInput
                  name='cost'
                  label='Valor de custo'
                  required={false}
                  type='text'
                  value={equipmentData.cost}
                  position='right'
                  onChange={e => handleChange('cost', e.target.value)}
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
                  onChange={() => null}
                />
              </div>

              <div className='flex items-center'>
                <div className='flex flex-row items-center gap-1'>
                  <input
                    id='disposable'
                    type='checkbox'
                    name='disposable'
                    className='rounded focus:ring-2 focus:ring-primaryDarker focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                    checked={equipmentData.disposable}
                    onChange={e =>
                      handleChangeBool('disposable', e.target.checked)
                    }
                  />
                  <label
                    htmlFor='disposable'
                    className='hidden sm:block top-0 left-0 relative px-1 font-semibold text-[--labelPrimary] text-[10px] uppercase whitespace-nowrap transition-all duration-300 select-none'
                  >
                    Não reutilizável
                  </label>
                </div>
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
                    checked={equipmentData.stockControl}
                    onChange={e =>
                      handleChangeBool('stockControl', e.target.checked)
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
                  {equipmentData.stockControl && (
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
                      <FormInput
                        name='stock'
                        label='Estoque'
                        required={false}
                        type='text'
                        value={equipmentData.stock}
                        position='right'
                        onChange={e => handleChange('stock', e.target.value)}
                      />

                      <FormInput
                        name='stockMinimum'
                        label='Estoque mínimo'
                        required={false}
                        type='text'
                        value={equipmentData.stockMinimum}
                        position='right'
                        onChange={e =>
                          handleChange('stockMinimum', e.target.value)
                        }
                      />

                      <FormInput
                        name='stockMaximum'
                        label='Estoque máximo'
                        required={false}
                        type='text'
                        value={equipmentData.stockMaximum}
                        position='right'
                        onChange={e =>
                          handleChange('stockMaximum', e.target.value)
                        }
                      />
                    </motion.div>
                  )}
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className='col-span-2'
                  >
                    <SearchSelect
                      value={equipmentData.stockLocation}
                      name='stockLocation'
                      options={[
                        { value: 'lc1', label: 'Local 1' },
                        { value: 'lc2', label: 'Local 2' },
                      ]}
                      placeholder='Localização'
                      onChange={() => null}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className='gap-4 grid sm:grid-cols-4 w-full'>
              <div className='col-span-1'>
                <FormInput
                  name='dimensions'
                  label='Dimensões'
                  required={false}
                  type='text'
                  value={equipmentData.dimensions}
                  position='right'
                  onChange={e => handleChange('dimensions', e.target.value)}
                />
              </div>

              <div className='gap-3 grid grid-cols-3 col-span-1'>
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
                  value={equipmentData.weightMeasure}
                  name='weightMeasure'
                  options={[
                    { value: 'kg', label: 'Kg' },
                    { value: 'lb', label: 'Lb' },
                  ]}
                  placeholder=''
                  onChange={() => null}
                />
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
              onChange={() => null}
            />

            <SearchSelect
              value={equipmentData.family}
              name='family'
              options={[
                { value: 'family1', label: 'Família 1' },
                { value: 'family2', label: 'Família 2' },
              ]}
              placeholder='Família'
              onChange={() => null}
            />

            <SearchSelect
              value={equipmentData.manufacturer}
              name='manufacturer'
              options={[
                { value: 'manufacturer1', label: 'Fabricante 1' },
                { value: 'manufacturer2', label: 'Fabricante 2' },
              ]}
              placeholder='Fabricante'
              onChange={() => null}
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
              name='approvalCertification'
              label='Certificado aprovação'
              required={false}
              type='text'
              value={equipmentData.approvalCertification}
              position='right'
              onChange={e =>
                handleChange('approvalCertification', e.target.value)
              }
            />

            <div className='gap-4 grid grid-cols-2'>
              <FormInput
                name='additionalCode'
                label='Código'
                required={false}
                type='text'
                value={equipmentData.additionalCode}
                position='right'
                onChange={e => handleChange('additionalCode', e.target.value)}
              />

              <FormInput
                name='expirationDate'
                label='Data expiração'
                required={false}
                type='text'
                value={equipmentData.expirationDate}
                position='right'
                onChange={e => handleChange('expirationDate', e.target.value)}
              />
            </div>
          </div>

          <ActionGroup />
        </form>
      </div>
    </div>
  )
}

export default CreateEquipment
