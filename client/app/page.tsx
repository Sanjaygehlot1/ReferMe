"use client";

import { motion } from "framer-motion";
import { LuUserPlus, LuShare2, LuLink, LuShoppingCart, LuBadgeCheck, LuChartBar, LuSparkles } from "react-icons/lu";
import Link from "next/link";

const steps = [
  {
    icon: <LuUserPlus className="text-xl" />,
    title: "Sign up",
    desc: "Create your account to receive your unique referral link.",
    cta: { href: "/signup", label: "Create account" },
  },
  {
    icon: <LuLink className="text-xl" />,
    title: "Get your link",
    desc: "Your personal referral link lives on your dashboard.",
  },
  {
    icon: <LuShare2 className="text-xl" />,
    title: "Share anywhere",
    desc: "Send your link to friends via chat, email, or social apps.",
  },
  {
    icon: <LuShoppingCart className="text-xl" />,
    title: "Friend's first purchase",
    desc: "Only the first purchase from each referred user awards credits.",
    tip: "No double-crediting — handled server-side.",
  },
  {
    icon: <LuBadgeCheck className="text-xl" />,
    title: "+2 credits to both",
    desc: "You and your friend each earn 2 credits automatically.",
  },
  {
    icon: <LuChartBar className="text-xl" />,
    title: "Track everything",
    desc: "Watch referrals, conversions, and credits update in real-time.",
    cta: { href: "/dashboard", label: "Open dashboard" },
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 shadow-sm"
          >
            <LuSparkles className="text-sm" />
            FileSure • Referrals & Credits
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="mt-6 text-4xl text-black font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            Earn credits by sharing
            <br />
            what you love
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 max-w-xl text-base text-zinc-600"
          >
            Invite friends with your unique link. When they make their first purchase, you both earn credits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href={'/signup'}>
            <button className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800">
              Get started • Free
            </button>
            </Link>
            <Link href={'/login'}>
            <button className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50">
              I already have an account
            </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24">
        <motion.div variants={container} initial="hidden" animate="show" className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div key={s.title} className="relative pl-16">
                <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm">
                  <div className="text-zinc-700">{s.icon}</div>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:border-zinc-300 hover:shadow-md">
                  <h3 className="text-base font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{s.desc}</p>
                  
                  {s.tip && (
                    <p className="mt-2 text-xs text-zinc-500 italic">{s.tip}</p>
                  )}
                  
                  {s.cta && (
                    <Link href={s.cta.href}>
                    <button  className="mt-4 inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50">
                      {s.cta.label}
                    </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-zinc-200 bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center text-xs text-zinc-500">
          Built with 💝 by Sanjay • © {new Date().getFullYear()} ReferMe
        </div>
      </footer>
    </div>
  );
}