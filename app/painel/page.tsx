'use client'

import { CollaboratorTemplate } from '@/components/Chart/Template/Collaborator'
import { EquipmentTemplate } from '@/components/Chart/Template/Equipment'
import { MovementTemplate } from '@/components/Chart/Template/Movement'
import { PendingTemplate } from '@/components/Chart/Template/Pending'
import { UserTemplate } from '@/components/Chart/Template/User'
import { ToastError } from '@/components/Template/Toast/Error'
import { Skeleton } from '@/components/ui/skeleton'
import { getSummaryReports } from '@/services/Report'
import { AnimatePresence, motion } from 'framer-motion'
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
      <AnimatePresence>
      {loading && (
        <motion.div
          key='data'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='flex flex-col gap-6 bg-[--backgroundSecondary] max-sm:px-3 sm:rounded-2xl w-full h-full'
        >
          <div className='gap-6 grid sm:grid-cols-3'>
            <Skeleton className='col-span-2 rounded-2xl w-full h-56' />
            <Skeleton className='col-span-1 rounded-2xl w-full h-56' />
          </div>

          <div className='gap-6 grid grid-cols-2 sm:grid-cols-3'>
            <Skeleton className='col-span-1 rounded-2xl w-full h-32' />
            <Skeleton className='col-span-1 rounded-2xl w-full h-32' />
            <Skeleton className='col-span-1 rounded-2xl w-full h-32' />
          </div>
        </motion.div>
      )}
      {!loading && reports.length > 0 && (
          <motion.div
            key='data'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                show={false}
              />
              <UserTemplate
                count={getReport('rp_004')?.graph.users ?? ''}
                updated={getReport('rp_004')?.graph.updated ?? ''}
                deleted={getReport('rp_004')?.graph.deleted ?? ''}
                show={false}
              />
              <CollaboratorTemplate
                count={getReport('rp_005')?.graph.collaborators ?? ''}
                active={getReport('rp_005')?.graph.active ?? ''}
                away={getReport('rp_005')?.graph.withdrawn ?? ''}
                show={false}
              />
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}
