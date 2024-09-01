"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";
import useInvalidateSession from "../../_hooks/useInvalidateSession";

type Props = { sessionId: string };

export default function SessionTileDeleteAlert({ sessionId }: Props) {
    const [open, setOpen] = useState(false);

    const { isPending, execute } = useInvalidateSession(() => setOpen(false));

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="relative text-error before:absolute before:left-1/2 before:top-1/2 before:block before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:p-4 before:transition-colors before:content-[''] hover:before:bg-slate-200/70">
                <TbTrashXFilled className="relative text-xl" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Invalidate session</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will invalid and
                        logout the user from this session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => execute({ sessionId })}
                        size="sm"
                    >
                        {isPending ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "Invalidate session"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
