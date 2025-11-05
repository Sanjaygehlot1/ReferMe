"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: Props) {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-white to-zinc-50">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-zinc-200 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-zinc-100 blur-3xl"
        />
      </motion.div>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur"
      >
        <div className="mb-6 space-y-1">
          <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-zinc-500">{subtitle}</p>
          ) : null}
        </div>

        {children}

        {footer ? <div className="mt-6 text-sm text-zinc-500">{footer}</div> : null}
      </motion.div>
    </div>
  );
}
