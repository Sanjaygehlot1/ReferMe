"use client";

import { motion } from "framer-motion";

export type ReferredRow = {
  _id: string;
  name?: string;
  email: string;
  status: boolean;
  createdAt?: string;
} ;

export default function ReferredTable({ rows, loading }: { rows: ReferredRow[]; loading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">Referred Users</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-500">
              <th className="py-2 pr-3 font-medium">User</th>
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-zinc-500">Loading…</td>
              </tr>
            ) : rows?.length ? (
              rows.map((r) => (
                <tr key={r._id} className="border-b last:border-b-0">
                  <td className="py-3 pr-3 text-zinc-900">{r.name || "—"}</td>
                  <td className="px-3 py-3 text-zinc-700">{r.email}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                      r.status ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${r.status ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {r.status ? "Converted" : "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-zinc-600">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-zinc-500">No referrals yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
