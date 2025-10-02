import { ActionGroup } from "@/components/Surfaces/ActionGroup";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

export function EquipmentSkeleton() {
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

        <div className='flex flex-row items-center gap-2'>
          <Skeleton className="rounded-xl w-[138px] min-w-[138px] h-10" />
          <Skeleton className="rounded-xl w-[138px] min-w-[138px] h-10" />
        </div>
      </div>

      <div className='relative gap-y-10 grid w-full'>
        <div className='flex flex-row gap-4 px-6 w-full'>
          <div>
            <Skeleton className="rounded-xl w-32 min-w-32 h-32" />
          </div>

          <div className='gap-4 grid grid-cols-2 w-full'>
            <Skeleton className="rounded-xl w-full h-[54px]" />
            <Skeleton className="rounded-xl w-full h-[54px]" />

            <div className='gap-3 grid grid-cols-2'>
              <Skeleton className="rounded-xl w-full h-[54px]" />
              <Skeleton className="rounded-xl w-full h-[54px]" />
            </div>

            <div className='block items-center w-full'>
              <Skeleton className="rounded-xl w-full h-[54px]" />
            </div>
          </div>
        </div>

        <div className='gap-4 grid sm:grid-cols-1 px-6 w-full'>
          <div className='grid sm:grid-cols-1 w-full'>
            <div className='relative flex flex-row justify-between items-center col-span-full mb-4 w-full'>
              <div className='flex flex-row items-center gap-2'>
                <Skeleton className='rounded-md w-5 min-w-5 h-5' />
                <Skeleton className="w-28 h-3" />
              </div>
            </div>
            <div className='gap-4 grid sm:grid-cols-5 w-full'>
              <AnimatePresence>
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
                  <Skeleton className="rounded-xl w-full h-[54px]" />
                  <Skeleton className="rounded-xl w-full h-[54px]" />
                  <Skeleton className="rounded-xl w-full h-[54px]" />
                </motion.div>
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className='col-span-2'
                >
                  <Skeleton className="rounded-xl w-full h-[54px]" />
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
                  <Skeleton className="rounded-xl w-full h-[54px]" />
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
                      <Skeleton className="rounded-xl w-full h-[54px]" />
                    </div>

                    <Skeleton className="rounded-xl w-full h-[54px]" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className='gap-4 grid grid-cols-3 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="absolute w-28 h-3" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
        </div>

        <div className='gap-4 grid grid-cols-2 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="absolute w-28 h-3" />
          </div>

          <Skeleton className="rounded-xl w-full h-[78px]" />
          <Skeleton className="rounded-xl w-full h-[78px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />

          <div className='gap-4 grid grid-cols-2'>
            <Skeleton className="rounded-xl w-full h-[54px]" />
            <Skeleton className="rounded-xl w-full h-[54px]" />
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