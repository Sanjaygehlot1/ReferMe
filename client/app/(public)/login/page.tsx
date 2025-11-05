"use client";

import { useState } from "react";
import { z } from "zod";
import { loginSchema } from "@/validationSchemas/auth";
import Input from "@/components/input";
import SubmitButton from "@/components/button";
import AuthCard from "@/components/authCard";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const data = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Login failed");
      }
      router.replace("/dashboard");
    } catch (err: any) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <p>
          New here?{" "}
          <a href="/signup" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Create an account
          </a>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {errors.form ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {errors.form}
          </p>
        ) : null}

        <Input name="email" type="email" label="Email" placeholder="you@example.com" error={errors.email} />
        <Input name="password" type="password" label="Password" placeholder="••••••••" error={errors.password} />

        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>
    </AuthCard>
  );
}
