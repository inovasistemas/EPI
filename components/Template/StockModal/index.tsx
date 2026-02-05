import { DateInput } from '@/components/Inputs/Date';
import { MaskedInput } from '@/components/Inputs/Masked';
import { InputOptionsMap } from '@/components/Inputs/Masked/types';
import { SearchSelect } from "@/components/Inputs/Select/SearchSelect";
import { ActionGroupSave } from "@/components/Surfaces/ActionGroupSave";
import { createEquipmentInventory } from '@/services/Equipment';
import { convertMoneyBRL } from '@/utils/convert-money-brl';
import { convertNumberDB } from '@/utils/convert-number-db';
import { convertToBoolean } from '@/utils/convert-to-boolean';
import 'cleave.js/dist/addons/cleave-phone.br';
import Cleave from 'cleave.js/react';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { toast } from 'sonner';
import { ToastError } from '../Toast/Error';
import { ToastSuccess } from '../Toast/Success';

type StockModalProps = {
  action: () => void
  equipment: string
  stock?: number
  cost?: number
}

type formData = {
  cost: number
  expiresAt: string
  notInformExpiresAt: boolean
  quantity: number
  reset: boolean
  type: boolean
}

export function StockModal({ equipment, stock, cost, action }: StockModalProps) {
  const options = InputOptionsMap['number']
  const [loading, setLoading] = useState(false)
  const stockOptions = [
    {
      value: 'true',
      label: 'Entrada',
    },
    {
      value: 'false',
      label: 'Saída',
    },
  ]

  const [formData, setFormData] = useState<formData>({
    cost: cost ?? 0,
    expiresAt: dayjs().format('YYYY-MM-DD'),
    notInformExpiresAt: false,
    quantity: 0,
    reset: false,
    type: true
  })

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveAction = async () => {
    const response = await createEquipmentInventory({
      id: equipment,
      loading: setLoading,
      clear_inventory: formData.reset,
      cost: formData.cost,
      expires_at: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
      not_inform_expires_at: formData.notInformExpiresAt,
      quantity: formData.quantity,
      type: formData.type
    })

    if (response && response.status === 201) {
      toast.custom(() => <ToastSuccess text='Movimentação criada com sucesso' />)
      action()
    } else {
      toast.custom(() => <ToastError text='Não foi possível criar a movimentação' />)
    }
  }

  return (
    <div className='relative flex flex-col w-full max-h-[500px] overflow-y-hidden'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full min-h-80 overflow-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>
            Movimentação de estoque
          </h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Registre entradas e saídas de equipamentos criando um histórico auditável de cada operação realizada.
          </span>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='items-start gap-6 grid grid-cols-1 py-6 select-none'
          >
            <div className='flex flex-col gap-3 w-full'>
              <div className='items-center grid grid-cols-2 w-full select-none'>
                <div>
                  <span className='font-medium'>Tipo</span>
                </div>
                <div className='grid w-full'>
                  <SearchSelect
                    value={stockOptions.find(option => convertToBoolean(option.value) === formData.type)?.value}
                    name='type'
                    onChange={(value) => handleChange('type', convertToBoolean(value))}
                    options={stockOptions}
                    placeholder=''
                  />
                </div>
              </div>
              <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
                <div>
                  <span className='font-medium'>Quantidade</span>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex items-center gap-3'>
                    <input
                      id='reset'
                      type='checkbox'
                      name='reset'
                      className='rounded focus:ring-[--primaryColor] focus:ring-2 focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      onChange={(e) => handleChange('reset', e.currentTarget.checked)}
                      checked={formData.reset}
                  />
                  <label htmlFor='reset' className='font-semibold text-[--labelPrimary] text-[10px] uppercase'>Zerar estoque e movimentar</label>
                  </div>
                  <Cleave
                    id='stock'
                    name='stock'
                    value={formData.quantity}
                    options={options}
                    className='peer block bg-[--backgroundSecondary] px-[12px] py-2 rounded-xl outline-none focus:outline-none focus:ring-[--primaryColor] focus:ring-2 w-full h-[54px] font-normal text-[--textSecondary] text-base transition-all duration-300 appearance-none'
                    placeholder=' '
                    onChange={(e) => handleChange('quantity', Number(e.currentTarget.value))}
                  />
                </div>
              </div>
              <AnimatePresence mode='wait'>
              { formData.type === true && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='items-center grid grid-cols-2 pt-6 w-full select-none'
                >
                  <div>
                    <span className='font-medium'>Custo</span>
                  </div>
                  <div className='flex flex-col gap-3 w-full'>
                    <MaskedInput
                      name='cost'
                      label='Valor de custo'
                      required={false}
                      type='money'
                      value={convertMoneyBRL(formData.cost ?? 0)}
                      position='right'
                      onChange={(e) => handleChange('cost', convertNumberDB(e.target.value))}
                    />
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
              <div className='items-center grid grid-cols-2 pt-6 w-full select-none'>
                <div>
                  <span className='font-medium'>Validade</span>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex items-center gap-3'>
                    <input
                      id='notInformExpiresAt'
                      type='checkbox'
                      name='notInformExpiresAt'
                      className='rounded focus:ring-[--primaryColor] focus:ring-2 focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      checked={formData.notInformExpiresAt === true || formData.type === false}
                      onChange={() => handleChange("notInformExpiresAt", !formData.notInformExpiresAt)}
                  />
                  <label htmlFor='notInformExpiresAt' className='font-semibold text-[--labelPrimary] text-[10px] uppercase'>Não informar validade</label>
                  </div>
                  <DateInput
                    disabled={formData.notInformExpiresAt === true || formData.type === false}
                    start={dayjs(formData.expiresAt)}
                    calendarType='day'
                    name='expiresAt'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </AnimatePresence>
      </div>

      <ActionGroupSave onClick={handleSaveAction} />
    </div>
  )
}