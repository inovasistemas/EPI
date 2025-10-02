import { ActionGroup } from "@/components/Surfaces/ActionGroup";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function UserSkeleton() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
      <div className='flex justify-between items-center gap-3 p-6 w-full'>
        <div className='flex flex-row items-center gap-3 w-full'>
          <Skeleton className="rounded-xl w-8 min-w-8 h-8" />

          <Skeleton className="w-44 h-7" />
        </div>
      </div>

      <form className='flex flex-col gap-x-4 gap-y-10 w-full h-full overflow-y-auto'>
        <div className='gap-4 grid grid-cols-2 h-full'>
          <div className='flex flex-col gap-4 px-6 w-full'>
            <div className='hidden sm:block relative mb-4'>
              <Skeleton className="absolute w-28 h-3" />
            </div>

            <Skeleton className="rounded-xl w-full h-[54px]" />
            <Skeleton className="rounded-xl w-full h-[54px]" />
            <Skeleton className="rounded-xl w-full h-[54px]" />
          </div>

          <div className='flex flex-col gap-4 px-6 w-full'>
            <div className='hidden sm:block relative mb-4'>
              <Skeleton className="absolute w-28 h-3" />
            </div>

            <Skeleton className="rounded-xl w-full h-[54px]" />
          </div>

          <div className='flex flex-col justify-end items-end gap-1 col-span-full px-6 w-full'>
            <div className='flex font-semibold text-[--labelPrimary] text-[10px] uppercase'>
              <Skeleton className="w-36 h-3" />
            </div>
          </div>
        </div>

        <ActionGroup
          uriBack='/usuarios'
          onDelete={() => null}
          onClick={() => null}
          showDelete={true}
        />
      </form>
    </motion.div>
  )
}