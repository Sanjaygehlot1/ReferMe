"use client";

import { HTMLInputTypeAttribute, useId} from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    error?: string;
    className? : string
    type : string
}

export default function Input({ label, name, className,type, error, ...props }: Props) {
    const id = useId();
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-sm text-zinc-500">{label}</label>
            <input
            type= {type}
                id={id}
                {...props}
                name= {name!}
                className={`w-full text-black rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
                    } ${className || ""}`}
            />
            {error ? <p className="text-xs text-red-500">{error}</p> : null}
        </div>
    );
}
