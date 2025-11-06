"use client";
import { useState, useMemo } from "react";
import {motion} from 'framer-motion'
import { AnimatePresence } from "framer-motion";

export default function ReferralLinkCard({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "");
  const link = useMemo(() => `${baseUrl}/register?r=${referralCode || ""}`, [baseUrl, referralCode]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on FileSure",
          text: "Use my referral link and earn credits",
          url: link,
        });
      } catch {}
    } else {
      copy();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 text-sm text-zinc-500">Your referral link</div>
      <div className="flex items-center gap-2">
        <code className="scrollbar-hide grow overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700">
          {link}
        </code>
        <button onClick={copy} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300">Copy</button>
        <button onClick={share} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300">Share</button>
      </div>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-xs text-emerald-600"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}