"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  icon?: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
  icon,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-72 h-72 bg-zinc-200 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 right-0 w-72 h-72 bg-zinc-300 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-0 left-1/2 w-72 h-72 bg-zinc-200 rounded-full mix-blend-multiply filter blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          {icon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-2xl mb-4 shadow-lg"
            >
              {icon}
            </motion.div>
          )}
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">{title}</h1>
          {subtitle && <p className="text-zinc-600">{subtitle}</p>}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-zinc-200 p-8 backdrop-blur-sm"
        >
          {children}
        </motion.div>

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-center mt-8 text-sm text-zinc-600"
          >
            {footer}
          </motion.div>
        )}
      </div>
    </div>
  );
}
