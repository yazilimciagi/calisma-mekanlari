import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="rounded-2xl flex flex-col border p-6">
      <Skeleton className="w-full h-60 mb-5 rounded-[0.5rem]" />
      <Skeleton className="w-1/2 h-6 mb-2 rounded-[0.5rem]" />
      <Skeleton className="w-full h-8 mb-4 rounded-[0.5rem]" />
      <div className="grid gap-y-2 mb-6">
        <div className="flex items-center text-muted-foreground">
          <Skeleton className="w-6 h-6 mr-2 rounded-[0.5rem]" />
          <Skeleton className="h-6 w-1/2 rounded-[0.5rem]" />
        </div>
        <div className="flex items-center text-muted-foreground">
          <Skeleton className="w-6 h-6 mr-2 rounded-[0.5rem]" />
          <Skeleton className="h-6 w-1/2 rounded-[0.5rem]" />
        </div>
        <div className="flex items-center text-muted-foreground">
          <Skeleton className="w-6 h-6 mr-2 rounded-[0.5rem]" />
          <Skeleton className="h-6 w-1/2 rounded-[0.5rem]" />
        </div>
        <div className="flex items-center text-muted-foreground">
          <Skeleton className="w-6 h-6 mr-2 rounded-[0.5rem]" />
          <Skeleton className="h-6 w-1/2 rounded-[0.5rem]" />
        </div>
      </div>
      <Skeleton className="h-10 rounded-[0.5rem] w-full mt-auto" />
    </div>
  );
}

export default SkeletonCard;
