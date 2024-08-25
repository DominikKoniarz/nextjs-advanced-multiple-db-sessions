import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { forwardRef, useId } from "react";

export interface FloatingLabelInput
    extends React.InputHTMLAttributes<HTMLInputElement> {
    // limiting the type of value to string | number | undefined
    // not handling the case where value is readonly string[]
    value: string | number | undefined;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInput>(
    (props, ref) => {
        const { className, value, placeholder, type } = props;

        const floatLabel =
            (typeof value === "string" && value.length > 0) ||
            typeof value === "number";

        const id = useId();

        return (
            <Label
                htmlFor={id}
                className="group relative w-full max-w-full shrink-0 space-y-0"
            >
                <Input
                    {...props}
                    id={id}
                    type={type}
                    ref={ref}
                    className={cn(
                        "rounded-ll peer h-fit w-full border-2 px-3 py-1.5 text-sm transition-[border,font] duration-100 hover:border-slate-800 focus-visible:border-2 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:border-2 group-hover:border-primary sm:px-4 sm:py-2 sm:text-base",
                        className,
                    )}
                    placeholder=""
                />
                <span
                    className={cn(
                        "absolute left-2.5 top-1/2 h-fit w-fit -translate-y-1/2 transform cursor-text bg-white px-0.5 font-medium text-slate-500 transition-all peer-focus-visible:left-2.5 peer-focus-visible:top-0 peer-focus-visible:cursor-default peer-focus-visible:text-xs peer-focus-visible:font-medium sm:left-3.5 sm:peer-focus-visible:left-3.5",
                        floatLabel && "left-3.5 top-0 cursor-default text-xs",
                    )}
                >
                    {placeholder}
                </span>
            </Label>
        );
    },
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
