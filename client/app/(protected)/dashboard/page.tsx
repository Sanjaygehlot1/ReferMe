"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ReferralLinkCard from "@/components/dashboard/ReferralLinkCard";
import MetricCard from "@/components/dashboard/MetricCard";
import PurchaseCard from "@/components/dashboard/PurchaseCard";
import ReferredTable from "@/components/dashboard/RefersTable";
import { getAuth } from "@/context/authContext";
import { LuLoaderCircle, LuCreditCard, LuUsers, LuUserCheck } from "react-icons/lu";
import { BiRefresh } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

export default function DashboardPage() {
  const { user, logOut, Loading, getUserSession } = getAuth();

  useEffect(() => {
    if (!user) getUserSession();
  }, [user, getUserSession]);

  if (Loading)
    return (
      <div className="flex h-screen items-center justify-center text-zinc-600">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-3xl"
        >
          <LuLoaderCircle />
        </motion.div>
      </div>
    );

  return (
    user && (
      <div className="min-h-[100dvh] bg-gradient-to-b from-white to-zinc-50 text-black">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MdDashboard className="text-xl text-zinc-700" />
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  Dashboard
                </h1>
              </div>
              <h2 className="mt-1 text-lg font-medium text-zinc-800">
                Hey, <span className="font-semibold">{user?.name || "User"}</span>
              </h2>
              <p className="text-sm text-zinc-500">
                Track referrals, conversions, and credits. Simulate purchases to test flows.
              </p>
              {user.invitedBy && <p className="text-sm text-zinc-500">
                 You are invited by <span className="font-bold text-black">{user.invitedBy}</span>
              </p>}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                onClick={getUserSession}
                disabled={Loading}
                className={`flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 ${
                  Loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {Loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <LuLoaderCircle className="text-lg" />
                  </motion.div>
                ) : (
                  <>
                    <BiRefresh className="text-lg" />
                    Refresh
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={logOut}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 active:scale-[0.98]"
              >
                <LuUserCheck className="text-lg" />
                Logout
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
            <MetricCard
              label="Total Referred Users"
              value={user?.referCount ?? 0}
              icon={<LuUsers className="text-xl text-zinc-600" />}
            />
            <MetricCard
              label="Converted Users"
              value={user?.converted ?? 0}
              icon={<LuUserCheck className="text-xl text-zinc-600" />}
            />
            <MetricCard
              label="Total Credits"
              value={user?.credits ?? 0}
              icon={<LuCreditCard className="text-xl text-zinc-600" />}
            />
          </motion.div>

          <ReferredTable rows={user?.referred ?? []} loading={false} />
        </div>
      </div>
    )
  );
}
