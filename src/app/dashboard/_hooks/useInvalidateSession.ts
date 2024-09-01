import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import invalidateSession from "../_actions/invalidateSession";

const useInvalidateSession = (cb: () => void) => {
    const router = useRouter();

    const { execute, isPending } = useAction(invalidateSession, {
        onError: (error) => {
            const fetchError = error.error.fetchError;

            if (fetchError) {
                toast.error(fetchError);
            }

            const serverError = error.error.serverError;

            if (serverError) {
                toast.error(serverError);
            }

            const validationErrors = error.error.validationErrors?.fieldErrors;

            if (validationErrors) {
                Object.values(validationErrors).forEach((errors) => {
                    toast.error(errors[0]);
                });
            }
        },
        onSuccess: () => {
            toast.success("Session invalidated successfully!");
        },
        onSettled: () => {
            router.refresh();
            cb();
        },
    });

    return { execute, isPending };
};

export default useInvalidateSession;
