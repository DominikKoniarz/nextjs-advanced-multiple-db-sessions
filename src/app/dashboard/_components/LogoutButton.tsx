"use client";

import { Button } from "@/components/ui/button";
import useLogout from "../_hooks/useLogout";
import { LoaderCircle } from "lucide-react";

export default function LogoutButton() {
    const { execute, isPending } = useLogout();

    return (
        <Button
            type="button"
            className="relative h-fit bg-transparent p-1 text-primary after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-0 after:bg-primary after:transition-all after:content-[''] hover:bg-transparent hover:after:w-full focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:after:w-full disabled:opacity-100"
            onClick={() => execute()}
            disabled={isPending}
        >
            {isPending ? (
                <LoaderCircle className="animate-spin" size={20} />
            ) : (
                "Logout"
            )}
        </Button>
    );
}
