"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { buyProduct } from "@/controllers/user";
import { getAuth } from "@/context/authContext";


export default function PurchaseCard({ onSuccess }: { onSuccess?: () => void }) {
  const [amount, setAmount] = useState<string>("9.99");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const {getUserSession} = getAuth()

  async function buy() {
    setLoading(true);
    setMessage("");
    try {
      const data = await buyProduct();
      setMessage(data?.creditsEarned > 0 ? `Purchase successful — ${data.creditsEarned} credits awarded` : "Purchase successful");
      onSuccess?.();
      getUserSession()

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 text-sm text-zinc-500">Simulate a purchase</div>
      <div className="flex items-center gap-3">
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
          placeholder="Amount"
        />
        <button
          disabled={loading}
          onClick={buy}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Processing…" : "Buy"}
        </button>
      </div>
      {message ? (
        <div className="mt-2 text-xs text-green-500">{message}</div>
      ) : null}
    </motion.div>
  );
}