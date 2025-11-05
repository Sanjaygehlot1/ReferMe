"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
};

export default function SubmitButton({
    children,
    className,
    loading,
    ...props
} : Props) {
    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || props.disabled}
            className={`w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition disabled:opacity-60 ${className}`
            }
            {...props}
        >
            {loading ? "Please wait…" : children}
        </motion.button>
    );
}
