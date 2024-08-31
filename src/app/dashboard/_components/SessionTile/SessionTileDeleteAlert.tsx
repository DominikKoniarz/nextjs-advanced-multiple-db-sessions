"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TbTrashXFilled } from "react-icons/tb";

export default function SessionTileDeleteAlert() {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="relative text-error before:absolute before:left-1/2 before:top-1/2 before:block before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:p-4 before:transition-colors before:content-[''] hover:before:bg-slate-200/70">
                <TbTrashXFilled className="relative text-xl" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
