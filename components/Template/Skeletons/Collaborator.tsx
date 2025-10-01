import { Skeleton } from "@/components/ui/skeleton";

export function CollaboratorSkeleton() {
  return (
    <div className='relative flex flex-col items-start gap-6 bg-[--backgroundPrimary] sm:rounded-xl w-full h-full'>
      <div className='flex justify-between items-center gap-3 p-6 w-full'>
        <div className='flex flex-row items-center gap-3 w-full'>
          <Skeleton className="w-5 min-w-5 h-5" />

          <Skeleton className="w-44 h-5" />
        </div>
      </div>

      <form className='gap-x-4 gap-y-10 grid sm:grid-cols-1 w-full overflow-y-auto'>
        <div className='gap-4 grid sm:grid-cols-3 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="w-28 h-3" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
        </div>

        <div className='gap-4 grid grid-cols-2 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="w-28 h-3" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />
          <Skeleton className="rounded-xl w-full h-[54px]" />
        </div>

        <div className='gap-4 grid grid-cols-3 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="w-28 h-3" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />

          <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
            <div className='col-span-2'>
              <Skeleton className="rounded-xl w-full h-[54px]" />
            </div>

            <Skeleton className="rounded-xl w-full h-[54px]" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />

          <div className='gap-4 grid grid-cols-3 col-span-2 w-full'>
            <div className='col-span-2'>
              <Skeleton className="rounded-xl w-full h-[54px]" />
            </div>
            <Skeleton className="rounded-xl w-full h-[54px]" />
          </div>

          <Skeleton className="rounded-xl w-full h-[54px]" />
        </div>

        <div className='gap-4 grid sm:grid-cols-2 px-6 w-full'>
          <div className='hidden sm:block relative col-span-full mb-4'>
            <Skeleton className="w-28 h-3" />
          </div>
          <Skeleton className="rounded-xl w-full h-[78px]" />
        </div>
      </form>
    </div>
  )
}