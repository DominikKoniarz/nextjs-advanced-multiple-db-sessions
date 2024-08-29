import loginWithGoogle from "@/actions/auth/loginWithGoogle";
import { useAction } from "next-safe-action/hooks";

const useGoogleLogin = () => {
    const { execute, isPending } = useAction(loginWithGoogle);

    return {
        login: execute,
        isPending,
    };
};

export default useGoogleLogin;
