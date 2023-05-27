import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-[38px] w-[90px]" />
        <div className="flex gap-2">
          <Skeleton className="h-[38px] w-[70px]" />
          <Skeleton className="h-[38px] w-[50px]" />
        </div>
      </div>
      <div className="mx-auto w-[800px] space-y-6">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[20px] w-2/3" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
    </div>
  )
}
