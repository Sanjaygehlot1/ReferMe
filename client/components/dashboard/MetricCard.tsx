"use client";

import { motion } from "framer-motion";

export default function MetricCard({ label, value, icon }: { label: string; value: number | string, icon? :React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-semibold text-zinc-900">{value}</p>
    </motion.div>
  );
}