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
                    <h2 className="max-w-72 overflow-hidden text-ellipsis text-lg font-bold">
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
