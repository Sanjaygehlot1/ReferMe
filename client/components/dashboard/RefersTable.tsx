"use client";

import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { format } from "date-fns";

export type ReferredRow = {
  _id: string;
  name?: string;
  email: string;
  status: boolean;
  createdAt?: string;
};

const LoadingSkeleton = () => (
  <tr>
    <td colSpan={4} className="py-3 pr-3 text-zinc-900 animate-pulse">
      <div className="h-4 w-3/4 rounded bg-zinc-100" />
    </td>
    <td className="px-3 py-3 text-zinc-700 animate-pulse">
      <div className="h-4 w-4/5 rounded bg-zinc-100" />
    </td>
    <td className="px-3 py-3">
      <div className="h-4 w-1/2 rounded bg-zinc-100" />
    </td>
    <td className="px-3 py-3 text-zinc-600 animate-pulse">
      <div className="h-4 w-2/3 rounded bg-zinc-100" />
    </td>
  </tr>
);

export default function ReferredTable({
  rows,
  loading,
}: {
  rows: ReferredRow[];
  loading: boolean;
}) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm relative"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">Referred Users</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-500">
              <th className="py-2 pr-3 font-medium whitespace-nowrap">User</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap">Email</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap">Status</th>
              <th className="px-3 py-2 font-medium whitespace-nowrap">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <LoadingSkeleton key={i} />)
            ) : rows?.length ? (
              rows.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="py-3 pr-3 text-zinc-900 font-medium whitespace-nowrap">
                    {r.name || "—"}
                  </td>
                  <td className="px-3 py-3 text-zinc-700 whitespace-nowrap">{r.email}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        r.status
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          r.status ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {r.status ? "Converted" : "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-zinc-600 whitespace-nowrap">
                    {formatDate(r.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-zinc-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mb-1 text-zinc-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    No referrals yet. Share your link!
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] grid place-items-center rounded-2xl">
          <FiLoader className="w-6 h-6 text-zinc-500 animate-spin" />
        </div>
      )}
    </motion.div>
  );
}
