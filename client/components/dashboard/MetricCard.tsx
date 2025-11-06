"use client";

import { motion } from "framer-motion";

export default function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900">{value}</p>
    </motion.div>
  );
}