"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";

export default function ReferralLinkCard({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQRBig, setShowQRBig] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const link = useMemo(() => `${baseUrl}/signup?ref=${referralCode || ""}`, [baseUrl, referralCode]);

  useEffect(() => {
    let mounted = true;
    (async () => {

      const QR = await import("qrcode");
      const url = await QR.toDataURL(link, { width: 256, margin: 1 });
      if (mounted) setQrDataUrl(url);

    })();
    return () => {
      mounted = false;
    };
  }, [link]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on ReferMe",
          text: "Use my referral link and earn credits",
          url: link,
        });
      } catch { }
    } else {
      copy();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm "
    >
      <div className="mb-3 text-sm text-zinc-500 ">Your referral link</div>

      <div className="flex items-start gap-3">
        
        <code className="scrollbar-hide grow overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 d">
          {link}
        </code>

        <div className="flex items-stretch gap-2">

          <div className="flex w-32 flex-col gap-2">
            
            <button
              onClick={copy}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 "
            >
              <FiCopy className="text-base" />
              Copy
            </button>
            <button
              onClick={share}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-300 "
            >
              <FiShare2 className="text-base" />
              Share
            </button>
          </div>


          <button
            onClick={() => setShowQRBig(true)}
            className="group relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm "
            title="Show QR"
          >
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Referral QR"
                className="h-full w-full object-contain p-2 transition group-hover:scale-[1.02]"
              />
            ) : (

              <LuQrCode className="text-2xl text-zinc-500 " />
            )}
          </button>
        </div>
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

      <AnimatePresence>
        {showQRBig && (
          <motion.div
            onClick={() => setShowQRBig(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
           
            className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl "
            >
              <div className="text-center text-sm text-zinc-600 mb-2 ">Scan to join</div>
              <img
                src={qrDataUrl || ""}
                alt="Referral QR Large"
                className="h-[256px] w-[256px] object-contain"
              />
              <div className="mt-3 text-center text-xs text-zinc-500 break-all px-2 ">{link}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}