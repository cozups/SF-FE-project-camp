import { Skeleton } from '@/shared';

function CardHeaderSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="w-[80%] h-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-36 h-8" />
        <Skeleton className="w-[30%] h-8" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-[30%] h-10" />
        <Skeleton className="w-[30%] h-10" />
      </div>
    </div>
  );
}

export { CardHeaderSkeleton };
