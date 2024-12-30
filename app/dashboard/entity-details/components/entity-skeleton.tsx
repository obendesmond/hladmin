import { Skeleton } from "@/components/ui/skeleton";

const EntitySkeleton = () => {

    return <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        ))}
    </div>
}

export default EntitySkeleton