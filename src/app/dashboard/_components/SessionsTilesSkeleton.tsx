function SessionTileSkeleton() {
    return (
        <div className="w-full rounded-md border-2 bg-white p-4 text-copy">
            {/* <div className="mb-1 flex flex-row items-center justify-between"> */}
            <div className="max-w-80 animate-pulse overflow-hidden text-ellipsis rounded bg-gray-200 p-3 text-lg font-bold"></div>
            {/* </div> */}
            <div className="mt-2.5 space-y-[11px]">
                <div className="w-36 animate-pulse rounded bg-gray-200 p-2"></div>
                <div className="w-36 animate-pulse rounded bg-gray-200 p-2"></div>
                <div className="w-36 animate-pulse rounded bg-gray-200 p-2"></div>
            </div>
        </div>
    );
}

export default function SessionsTilesSkeleton() {
    return (
        <div className="grid w-full grid-cols-2 gap-4">
            <SessionTileSkeleton />
            <SessionTileSkeleton />
            <SessionTileSkeleton />
            <SessionTileSkeleton />
        </div>
    );
}
