import logout from "@/actions/auth/logout";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";

const useLogout = () => {
    const { execute, isPending } = useAction(logout, {
        onError: (error) => {
            const fetchError = error.error.fetchError;

            if (fetchError) {
                toast.error(fetchError);
            }

            const serverError = error.error.serverError;

            if (serverError) {
                toast.error(serverError);
            }
        },
    });

    return { execute, isPending };
};

export default useLogout;
