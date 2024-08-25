import registerSchema, { RegisterSchema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useRegisterForm = () => {
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    return form;
};

export default useRegisterForm;
