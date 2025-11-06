"use client";

import { motion } from "framer-motion";
import ReferralLinkCard from "@/components/dashboard/ReferralLinkCard";
import MetricCard from "@/components/dashboard/MetricCard";
import PurchaseCard from "@/components/dashboard/PurchaseCard";
import ReferredTable from "@/components/dashboard/RefersTable";
import { getAuth } from "@/context/authContext";

export default function DashboardPage() {
  const { user, logOut, Loading } = getAuth();
  console.log(Loading)

  return (
    !Loading && <div className="min-h-[100dvh] bg-gradient-to-b text-black from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Dashboard
            </h1>
            <h2 className="text-lg font-medium text-zinc-800 mt-1">
              Hey, <span className="font-semibold">{user?.name || "User"}</span>
            </h2>
            <p className="text-sm text-zinc-500">
              Track referrals, conversions, and credits. Simulate purchases to
              test flows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              // onClick={() => fetchAll()}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 active:scale-[0.98]"
            >
              Refresh
            </button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={logOut}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 active:scale-[0.98]"
            >
              {Loading ? "Logging out..." : "Logout"}
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ReferralLinkCard referralCode={user?.referCode as string} />
          <PurchaseCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <MetricCard label="Total Referred Users" value={user?.referCount as number} />
          <MetricCard label="Converted Users" value={user?.converted as number} />
          <MetricCard label="Total Credits" value={user?.credits as number} />
        </motion.div>

        <ReferredTable rows={user?.referred ?? []} loading={false} />
      </div>
    </div>
  );
}
