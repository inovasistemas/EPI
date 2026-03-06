import { MaskedInput } from '@/components/Inputs/Masked'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import { ActionGroupSave } from '@/components/Surfaces/ActionGroupSave'
import { ToastError } from '@/components/Template/Toast/Error'
import { Skeleton } from '@/components/ui/skeleton'
import { getEnterprise, updateEnterprise } from '@/services/Enterprise'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ToastSuccess } from '../Toast/Success'

type EnterpriseType = {
  id: number;
  uuid: string;
  corporate_name: string | null;
  commercial_name: string | null;
  address: string | null;
  neighborhood: string | null;
  address_number: string | null;
  city: string | null;
  postal_code: string | null;
  state: string | null;
  cnpj: string | null;
  ie: string | null;
  phone_number: string | null;
  logo: string | null;
  email: string | null;
  status: boolean | null;
  register_date: string | null;
  last_change_date: string | null
}

export function CorporateDetailsSettings() {
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseType | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(false)
  const fetchedEnterprise = useRef(false)

  const [customEnterpriseData, setCustomEnterpriseData] = useState<EnterpriseType>({
    corporate_name: '',
    commercial_name: '',
    address: '',
    neighborhood: '',
    address_number: '',
    city: '',
    postal_code: '',
    state: '',
    cnpj: '',
    ie: '',
    phone_number: '',
    logo: '',
    email: '',
    status: null,
    id: 0,
    uuid: '',
    register_date: '',
    last_change_date: ''
  })

  const handleUpdateEnterprise = async () => {
    const response = await updateEnterprise({
      id: enterpriseData?.uuid || '',
      email: customEnterpriseData?.email?.toLocaleUpperCase() || '',
      commercial_name: customEnterpriseData?.commercial_name?.toLocaleUpperCase() || '',
      address: customEnterpriseData?.address?.toLocaleUpperCase() || '',
      neighborhood: customEnterpriseData?.neighborhood?.toLocaleUpperCase() || '',
      address_number: customEnterpriseData?.address_number?.toLocaleUpperCase() || '',
      city: customEnterpriseData?.city?.toLocaleUpperCase() || '',
      postal_code: customEnterpriseData?.postal_code?.toLocaleUpperCase() || '',
      state: customEnterpriseData?.state?.toLocaleUpperCase() || '',
      phone_number: customEnterpriseData?.phone_number?.toLocaleUpperCase() || '',
      logo: customEnterpriseData?.logo?.toLocaleUpperCase() || '',
      loading: setLoading
    })

    if (response && response.status === 200) {
      fetchedEnterprise.current = false
      fetchEnterprise()
      setHasChanges(false)

      toast.custom(() => (
        <ToastSuccess text='Dados da empresa atualizados com sucesso' />
      ))
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível atualizar os dados da empresa' />
      ))
    }
  }

  const handleChange = (name: string, value: string | boolean) => {
    const newData = {
      ...customEnterpriseData,
      [name]: value,
    }

    setCustomEnterpriseData(newData)

    const changed =
      newData.email?.toLocaleLowerCase() !== enterpriseData?.email?.toLocaleLowerCase() ||
      newData.commercial_name?.toLocaleLowerCase() !== enterpriseData?.commercial_name?.toLocaleLowerCase() ||
      newData.address?.toLocaleLowerCase() !== enterpriseData?.address?.toLocaleLowerCase() ||
      newData.neighborhood?.toLocaleLowerCase() !== enterpriseData?.neighborhood?.toLocaleLowerCase() ||
      newData.address_number?.toLocaleLowerCase() !== enterpriseData?.address_number?.toLocaleLowerCase() ||
      newData.city?.toLocaleLowerCase() !== enterpriseData?.city?.toLocaleLowerCase() ||
      newData.postal_code?.toLocaleLowerCase() !== enterpriseData?.postal_code?.toLocaleLowerCase() ||
      newData.state?.toLocaleLowerCase() !== enterpriseData?.state?.toLocaleLowerCase() ||
      newData.phone_number?.toLocaleLowerCase() !== enterpriseData?.phone_number?.toLocaleLowerCase() ||
      newData.logo?.toLocaleLowerCase() !== enterpriseData?.logo?.toLocaleLowerCase()

    setHasChanges(changed)
  }

  const fetchEnterprise = async () => {
    const response = await getEnterprise({loading: setLoading})

    if (response && response.status === 200) {
      setEnterpriseData(response.data)
      setCustomEnterpriseData(response.data)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os dados do usuário' />
      ))
    }
  }

  useEffect(() => {
    if (fetchedEnterprise.current) return
    fetchedEnterprise.current = true
    fetchEnterprise()
  }, [])

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div className='flex flex-col px-6 divide-y divide-[--border] h-full overflow-y-auto'>
        <div className='py-6 select-none'>
          <h2 className='font-medium text-xl leading-none'>Dados da empresa</h2>
          <span className='opacity-60 text-[--textSecondary] text-sm'>
            Edite os dados da empresa e mantenha o cadastro atualizado.
          </span>
        </div>

        <AnimatePresence mode='wait'>
          {loading && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='gap-3 grid grid-cols-2 pt-8'>
              <Skeleton className='rounded-xl w-full h-[52px]' />
              <Skeleton className='rounded-xl w-full h-[52px]' />

              <div className='col-span-full w-full'>
                <Skeleton className='rounded-xl w-full h-[132px]' />
              </div>

            </motion.div>
          )}
        
        {!loading && (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='gap-3 grid grid-cols-2 pt-8'>
            <FormInput
              name='commercial_name'
              label='Nome fantasia'
              required={false}
              type='text'
              value={customEnterpriseData.commercial_name?.toLocaleLowerCase() || ''}
              position='right'
              onChange={e => handleChange('commercial_name', e.target.value)}
              textTransform='capitalize'
            />

            <FormInput
              name='corporate_name'
              label='Razão social'
              required={false}
              disabled={true}
              type='text'
              value={customEnterpriseData.corporate_name?.toLocaleLowerCase() || ''}
              position='right'
              onChange={e => handleChange('corporate_name', e.target.value)}
              textTransform='capitalize'
            />

            <FormInput
              name='cnpj'
              label='CNPJ'
              required={false}
              disabled={true}
              type='text'
              value={customEnterpriseData.cnpj || ''}
              position='right'
              onChange={e => handleChange('cnpj', e.target.value)}
              textTransform='lowercase'
            />

            <FormInput
              name='ie'
              label='IE'
              required={false}
              disabled={true}
              type='text'
              value={customEnterpriseData.ie || ''}
              position='right'
              onChange={e => handleChange('ie', e.target.value)}
              textTransform='lowercase'
            />
          </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='hidden sm:block mt-6 px-1 pt-6 !border-t-0 font-semibold text-[--labelPrimary] text-[10px] transition-all duration-300 select-none'
          >
            <span className='uppercase'>Contato</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {loading && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='gap-3 grid grid-cols-2 pt-8 !border-t-0'>
              <Skeleton className='rounded-xl w-full h-[52px]' />
              <Skeleton className='rounded-xl w-full h-[52px]' />

              <div className='col-span-full w-full'>
                <Skeleton className='rounded-xl w-full h-[132px]' />
              </div>

            </motion.div>
          )}
        
        {!loading && (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='gap-3 grid grid-cols-3 pt-8 !border-t-0'>
            <div className='col-span-2'>
              <FormInput
                name='email'
                label='E-mail'
                required={false}
                type='email'
                value={customEnterpriseData.email?.toLocaleLowerCase() || ''}
                position='right'
                onChange={e => handleChange('email', e.target.value)}
                textTransform='lowercase'
              />
            </div>

            <MaskedInput
              name='phone_number'
              label='Telefone'
              required={false}
              type='phone'
              value={customEnterpriseData.phone_number || ''}
              position='right'
              onChange={e => handleChange('phone_number', e.target.value)}
            />
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <ActionGroupSave
        actionDisabled={!hasChanges}
        onClick={handleUpdateEnterprise}
      />
    </div>
  )
}
