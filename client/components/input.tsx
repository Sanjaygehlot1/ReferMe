"use client";

import { forwardRef, useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, icon, rightElement, className, ...props }, ref) => {
    const id = useId();
    
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            name={name}
            className={`w-full ${icon ? "pl-12" : "pl-4"} ${
              rightElement ? "pr-12" : "pr-4"
            } py-3.5 rounded-xl border ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-zinc-200 focus:border-zinc-900 focus:ring-zinc-900"
            } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-white text-zinc-900 placeholder:text-zinc-400 ${
              className || ""
            }`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;