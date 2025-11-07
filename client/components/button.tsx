"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function SubmitButton({
  children,
  loading,
  icon,
  disabled,
  className,
  onClick,
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      type="submit"
      disabled={loading || disabled}
      onClick={onClick}
      className={`w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group ${
        className || ""
      }`}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Please wait...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon && (
            <span className="group-hover:translate-x-1 transition-transform">
              {icon}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}