import { ActionGroup } from "@/components/Surfaces/ActionGroup";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

export function RoutineSkeleton() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full overflow-auto'>
      <div className='flex justify-between items-center gap-3 p-6 w-full'>
        <div className='flex flex-row items-center gap-3 w-full'>
          <Skeleton className="rounded-xl w-8 min-w-8 h-8" />

          <Skeleton className="w-44 h-7" />
        </div>
      </div>

      <div className='relative gap-y-10 grid w-full'>
        <div className='flex flex-col gap-4 px-6 w-full'>
          <div className='gap-4 grid grid-cols-1 w-full'>
            <Skeleton className="rounded-xl w-full h-[54px]" />
          </div>
          <div className='gap-4 grid grid-cols-2 w-full'>
            <Skeleton className="rounded-xl w-full h-[224px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="rounded-xl w-full h-[54px]" />
              <Skeleton className="rounded-xl w-full h-[154px]" />
            </div>
          </div>
        </div>

        <div className='gap-4 grid sm:grid-cols-1 px-6 w-full'>
          <div className='grid sm:grid-cols-1 w-full'>
            <div className='relative flex flex-row justify-between items-center col-span-full mb-4 w-full'>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className="w-44 h-7" />
              </div>
              <div>
                <Skeleton className="rounded-xl w-[138px] min-w-[238px] h-10" />
              </div>
            </div>
            <div className='gap-4 grid sm:grid-cols-1 w-full'>
              <Skeleton className="rounded-xl w-full h-[88px]" />
              <Skeleton className="rounded-xl w-full h-[88px]" />
            </div>
          </div>
        </div>

        <ActionGroup
          onDelete={() => null}
          uriBack='/equipamentos'
          showDelete={true}
          onClick={() => null}
        />
      </div>
    </motion.div>
  )
}