"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";

export interface FloatingLabelInput
    extends React.InputHTMLAttributes<HTMLInputElement> {
    // limiting the type of value to string | number | undefined
    // not handling the case where value is readonly string[]
    value: string | number | undefined;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInput>(
    (props, ref) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);

        const { className, value, placeholder, type } = props;

        const floatLabel =
            (typeof value === "string" && value.length > 0) ||
            typeof value === "number";

        const id = useId();

        return (
            <Label
                htmlFor={id}
                className="group relative flex h-fit w-full max-w-full shrink-0 flex-row items-center space-y-0 rounded-ll border-2 transition-[border] duration-100 hover:border-slate-800 has-[input:focus-visivle]:border-2 has-[input:focus-visible]:border-primary"
            >
                <Input
                    {...props}
                    id={id}
                    type={
                        type === "password"
                            ? !showPassword
                                ? "password"
                                : "text"
                            : type
                    }
                    ref={ref}
                    className={cn(
                        "peer h-fit w-full rounded-xl border-0 px-3 py-1.5 text-sm transition-[font] duration-100 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4 sm:py-2 sm:text-base",
                        type === "password" && "pr-0.5 sm:pr-0.5",
                        className,
                    )}
                    placeholder=""
                />
                <span
                    className={cn(
                        "absolute left-2.5 top-1/2 h-fit w-fit -translate-y-1/2 transform cursor-text bg-white px-0.5 font-medium text-slate-500 transition-all peer-focus-visible:left-2.5 peer-focus-visible:top-0 peer-focus-visible:cursor-default peer-focus-visible:text-xs peer-focus-visible:font-medium sm:left-3.5 sm:peer-focus-visible:left-3.5",
                        floatLabel &&
                            "left-2.5 top-0 cursor-default text-xs sm:left-3.5",
                    )}
                >
                    {placeholder}
                </span>
                {type === "password" && (
                    <Button
                        type="button"
                        className="mx-1 flex h-fit w-fit items-center justify-center bg-transparent px-px py-[5px] text-slate-500 transition-all hover:bg-slate-200/70 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:mx-1.5 sm:px-1 sm:py-1.5"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((prev) => !prev);
                        }}
                    >
                        {!showPassword ? (
                            <EyeOff className="h-4 sm:h-5" />
                        ) : (
                            <Eye className="h-4 sm:h-5" />
                        )}
                    </Button>
                )}
            </Label>
        );
    },
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export default FloatingLabelInput;
