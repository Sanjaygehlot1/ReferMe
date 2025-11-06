"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/validationSchemas/auth";
import Input from "@/components/input";
import SubmitButton from "@/components/button";
import AuthCard from "@/components/authCard";
import { useRouter, useSearchParams } from "next/navigation";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { signUp } from "@/controllers/user";

export type userData = {
  name: string;
  email: string;
  password: string;
  referCode?: string; 
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();

  const referralCode = useMemo(() => params.get("ref") || "", [params]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch,
  } = useForm<userData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      referCode: referralCode || "",
    },
  });

  useEffect(() => {
    if (referralCode) setValue("referCode", referralCode);
  }, [referralCode, setValue]);

   const router = useRouter();

  const onSubmit = async (data: userData) => {
    try {
      console.log(data)
      await signUp(data);
      router.replace("/login");
    } catch (err: any) {
      setError("root", { type: "server", message: err?.message || "Something went wrong" });
    }
  };

  const rootError = (errors.root as any)?.message as string | undefined;
  const currentReferCode = watch("referCode");

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {rootError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {rootError}
          </p>
        ) : null}

        <Input
          type="text"
          label="Name"
          placeholder="Lina Example"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Choose a strong password"
            error={errors.password?.message}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute top-11 right-4 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-zinc-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <RxEyeClosed className="h-5 w-5" /> : <RxEyeOpen className="h-5 w-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Input
            type="text"
            label="Referral Code (optional)"
            placeholder="e.g. LINA123"
            error={errors.referCode?.message}
            {...register("referCode")}
          />
          {currentReferCode ? (
            <p className="text-xs text-emerald-600">
              Referral detected: <span className="font-medium">{currentReferCode}</span>
            </p>
          ) : null}
        </div>

        <SubmitButton loading={isSubmitting}>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}
