import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ReportCostSkeleton() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] pt-8 sm:rounded-xl w-full overflow-auto'>
      <div className='relative gap-y-10 grid w-full'>
        <div className='flex flex-col gap-4 px-3 w-full'>
          <div className='gap-1 grid grid-cols-1 w-full'>
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="rounded-xl w-[80%] h-[24px]" />
              <Skeleton className="rounded-full w-[8ch] h-[16px]" />
            </div>
            <div className="flex gap-3 w-full">
              <Skeleton className="rounded-full w-[40%] h-[10px]" />
              <Skeleton className="rounded-full w-[8ch] h-[10px]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}