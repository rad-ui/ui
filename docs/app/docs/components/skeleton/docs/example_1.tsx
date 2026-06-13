"use client"

import Skeleton from "@radui/ui/Skeleton"

const SkeletonExample = () => {
    return (
        <div className="flex flex-col gap-3 w-[280px]">
            <Skeleton loading={true} width="100%" height="16px" radius="4px" />
            <Skeleton loading={true} width="80%" height="16px" radius="4px" />
            <Skeleton loading={true} width="90%" height="16px" radius="4px" />
            <Skeleton loading={true} width="40px" height="40px" radius="50%" />
        </div>
    )
}

export default SkeletonExample
