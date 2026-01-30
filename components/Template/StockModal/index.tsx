import { DateInput } from '@/components/Inputs/Date';
import { InputOptionsMap } from '@/components/Inputs/Masked/types';
import { SearchSelect } from "@/components/Inputs/Select/SearchSelect";
import { ActionGroupSave } from "@/components/Surfaces/ActionGroupSave";
import 'cleave.js/dist/addons/cleave-phone.br';
import Cleave from 'cleave.js/react';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

type StockModalProps = {
  action: () => void
}

type formData = {
  startedAt: string
}

export function StockModal({ action }: StockModalProps) {
  const options = InputOptionsMap['number']
  const [stockZero, setStockZero] = useState(false)
  const [stockType, setStockType] = useState('true')
  const [expirationDateControl, setExpirationDateControl] = useState(false)
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
    startedAt: dayjs().format('YYYY-MM-DD')
  })

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full min-h-80 overflow-y-auto'>
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
                    value={stockOptions.find(option => option.value === stockType)?.value}
                    name='selectType'
                    onChange={(value) => setStockType(value)}
                    options={stockOptions}
                    placeholder=''
                  />
                </div>
              </div>
              <div className='items-center grid grid-cols-2 w-full select-none pt-6'>
                <div>
                  <span className='font-medium'>Quantidade</span>
                </div>
                <div className='grid w-full flex flex-col gap-3'>
                  <div className='flex items-center gap-3'>
                    <input
                      id='stockControl'
                      type='checkbox'
                      name='stockControl'
                      className='rounded focus:ring-2 focus:ring-[--primaryColor] focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      checked={stockZero}
                      onChange={() => setStockZero(!stockZero)}
                  />
                  <label htmlFor='stockControl' className='font-semibold text-[--labelPrimary] text-[10px] uppercase'>Zerar estoque e movimentar</label>
                  </div>
                  <Cleave
                    id='stock'
                    name='stock'
                    options={options}
                    className='peer block focus:ring-2 focus:ring-[--primaryColor] bg-[--backgroundSecondary] px-[12px] h-[54px] py-2 rounded-xl outline-none focus:outline-none w-full font-normal text-[--textSecondary] text-base transition-all duration-300 appearance-none'
                    placeholder=' '
                    onChange={() => null}
                  />
                </div>
              </div>
              <div className='items-center grid grid-cols-2 w-full select-none pt-6'>
                <div>
                  <span className='font-medium'>Validade</span>
                </div>
                <div className='grid w-full flex flex-col gap-3'>
                  <div className='flex items-center gap-3'>
                    <input
                      id='expirationDateControl'
                      type='checkbox'
                      name='expirationDateControl'
                      className='rounded focus:ring-2 focus:ring-[--primaryColor] focus:ring-offset-0 text-[--secondaryColor] checkboxSecondary'
                      checked={expirationDateControl}
                      onChange={() => setExpirationDateControl(!expirationDateControl)}
                  />
                  <label htmlFor='expirationDateControl' className='font-semibold text-[--labelPrimary] text-[10px] uppercase'>Não informar validade</label>
                  </div>
                  <DateInput
                    disabled={expirationDateControl}
                    start={dayjs(formData.startedAt)}
                    calendarType='day'
                    name='startedAt'
                    onChange={() => null}
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </AnimatePresence>
      </div>

      <ActionGroupSave onClick={action} />
    </div>
  )
}