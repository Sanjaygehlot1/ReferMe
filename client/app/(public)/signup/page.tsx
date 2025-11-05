"use client";

import { useEffect, useMemo, useState } from "react";
import { signUpSchema } from "@/validationSchemas/auth";
import Input from "@/components/input";
import SubmitButton from "@/components/button";
import AuthCard from "@/components/authCard";
import { useRouter, useSearchParams } from "next/navigation";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

export default function RegisterPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const params = useSearchParams();
    const router = useRouter();

    const referralCode = useMemo(() => params.get("r") || "", [params]);

    useEffect(() => {
        
    }, [referralCode]);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({});
        const form = new FormData(e.currentTarget);
        const data = {
            name: String(form.get("name") || ""),
            email: String(form.get("email") || ""),
            password: String(form.get("password") || ""),
            referralCode: String(form.get("referralCode") || ""),
        };

        const parsed = signUpSchema.safeParse(data);
        if (!parsed.success) {
            const errs: Record<string, string> = {};
            parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
            setErrors(errs);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(parsed.data),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j?.message || "Registration failed");
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
            title="Create your account"
            subtitle="Sign up to start earning referral credits"
            footer={
                <p>
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
                        Log in
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

                <Input type="text" name="name" label="Name" placeholder="Lina Example" error={errors.name} />
                <Input name="email" type="email" label="Email" placeholder="you@example.com" error={errors.email} />
                <div className="relative">
                    <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Choose a strong password"
                        error={errors.password}
                      
                        className="pr-10"
                    />
                    <button
                        type="button" 
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute top-11  right-4 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <RxEyeClosed className="h-5 w-5" /> : <RxEyeOpen className="h-5 w-5" />}
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <Input
                        type="text"
                        name="referralCode"
                        label="Referral Code (optional)"
                        placeholder="e.g. LINA123"
                        defaultValue={referralCode}
                        error={errors.referralCode}
                    />
                    {referralCode ? (
                        <p className="text-xs text-emerald-600">
                            Referral detected: <span className="font-medium">{referralCode}</span>
                        </p>
                    ) : null}
                </div>

                <SubmitButton loading={loading}>Create account</SubmitButton>
            </form>
        </AuthCard>
    );
}
