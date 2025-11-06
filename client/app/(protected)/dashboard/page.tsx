"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ReferralLinkCard from "@/components/dashboard/ReferralLinkCard";
import MetricCard from "@/components/dashboard/MetricCard";
import PurchaseCard from "@/components/dashboard/PurchaseCard";
import ReferredTable from "@/components/dashboard/RefersTable";

export default function DashboardPage() {


  return (
    <div className="min-h-[100dvh] bg-gradient-to-b text-black from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Dashboard</h1>
            <p className="text-sm text-zinc-500">Track referrals, conversions, and credits. Simulate purchases to test flows.</p>
          </div>
          <button
            // onClick={() => fetchAll()}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 active:scale-[0.99]"
          >
            Refresh
          </button>
        </div>

        {/* {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        ) : null} */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReferralLinkCard  referralCode="12" />
          <PurchaseCard  />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <MetricCard label="Total Referred Users" value={12} />
          <MetricCard label="Converted Users" value={4} />
          <MetricCard label="Total Credits" value={8} />
        </motion.div>

        <ReferredTable rows={[]} loading={false} />
      </div>
    </div>
  );
}

