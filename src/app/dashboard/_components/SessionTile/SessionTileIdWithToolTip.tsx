import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SessionTileIdWithToolTip({ id }: { id: string }) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>
                    <h2 className="max-w-48 overflow-hidden text-ellipsis text-base font-bold transition-all xxs:max-w-60 xs:max-w-72 sm:max-w-80 md:text-lg lg:max-w-80 xl:max-w-96">
                        {id}
                    </h2>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{id}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
