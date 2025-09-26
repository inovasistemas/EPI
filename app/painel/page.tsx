'use client'

import { CollaboratorTemplate } from '@/components/Chart/Template/Collaborator'
import { EquipmentTemplate } from '@/components/Chart/Template/Equipment'
import { MovementTemplate } from '@/components/Chart/Template/Movement'
import { PendingTemplate } from '@/components/Chart/Template/Pending'
import { UserTemplate } from '@/components/Chart/Template/User'
import { ToastError } from '@/components/Template/Toast/Error'
import { getSummaryReports } from '@/services/Report'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Report = {
  code: string
  title: string
  show: boolean
  graph: any
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState<Report[]>([])

  const fetchSummaryReports = async () => {
    const response = await getSummaryReports({ loading: setLoading })

    if (response && response.status === 200) {
      setReports(response.data.data)
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível buscar os relatórios' />
      ))
    }
  }

  useEffect(() => {
    fetchSummaryReports()
  }, [])

  const getReport = (code: string) => reports.find(r => r.code === code)

  return (
    <div className='flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto'>
      {loading && (
        <motion.div
          key='loading'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className='flex justify-center items-start pt-10 w-full h-full'
        >
          <div role='status'>
            <svg
              aria-hidden='true'
              className='fill-[--primaryColor] w-8 h-8 text-[--buttonPrimary] animate-spin'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Carregando...</span>
          </div>
        </motion.div>
      )}
      {!loading && (
        <motion.div
          key='data'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className='flex flex-col gap-6 bg-[--backgroundSecondary] max-sm:px-3 sm:rounded-2xl w-full h-full'
        >
          <div className='gap-6 grid sm:grid-cols-3'>
            <MovementTemplate chart={getReport('rp_001')?.graph ?? []} show={getReport('rp_001')?.show ?? false} />
            <PendingTemplate
              equipment={getReport('rp_002')?.graph.equipment ?? ''}
              withdrawn={getReport('rp_002')?.graph.withdrawn ?? ''}
              notwithdrawn={getReport('rp_002')?.graph.notwithdrawn ?? ''}
              show={getReport('rp_002')?.show ?? false}
            />
          </div>

          <div className='gap-6 grid grid-cols-2 sm:grid-cols-3'>
            <EquipmentTemplate
              count={getReport('rp_003')?.graph.equipments ?? ''}
              expired={getReport('rp_003')?.graph.expired ?? ''}
              pending={getReport('rp_003')?.graph.pending_return ?? ''}
              show={getReport('rp_003')?.show ?? false}
            />
            <UserTemplate
              count={getReport('rp_004')?.graph.users ?? ''}
              updated={getReport('rp_004')?.graph.updated ?? ''}
              deleted={getReport('rp_004')?.graph.deleted ?? ''}
              show={getReport('rp_004')?.show ?? false}
            />
            <CollaboratorTemplate
              count={getReport('rp_005')?.graph.collaborators ?? ''}
              active={getReport('rp_005')?.graph.active ?? ''}
              away={getReport('rp_005')?.graph.withdrawn ?? ''}
              show={getReport('rp_005')?.show ?? false}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
