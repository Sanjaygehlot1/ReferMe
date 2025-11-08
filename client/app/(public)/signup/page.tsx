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
import { MdPerson, MdEmail, MdLock, MdCardGiftcard, MdArrowForward } from "react-icons/md";
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
  const router = useRouter();

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

  const onSubmit = async (data: userData) => {
    try {
      await signUp(data);
      router.replace("/login");
    } catch (err: any) {
      setError("root", {
        type: "server",
        message: err?.message || "Something went wrong",
      });
    }
  };

  const rootError = (errors.root as any)?.message as string | undefined;
  const currentReferCode = watch("referCode");

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to start earning"
      icon={<MdPerson className="text-3xl text-white" />}
      footer={
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-zinc-900 hover:underline underline-offset-4"
          >
            Log in
          </a>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {rootError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <p className="text-xs">{rootError}</p>
          </div>
        )}

        <Input
          type="text"
          label="Name"
          placeholder="Lina Example"
          icon={<MdPerson className="text-xl" />}
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          type="email"
          label="Email address"
          placeholder="you@example.com"
          icon={<MdEmail className="text-xl" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Choose a strong password"
          icon={<MdLock className="text-xl" />}
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <RxEyeClosed className="text-xl" />
              ) : (
                <RxEyeOpen className="text-xl" />
              )}
            </button>
          }
          {...register("password")}
        />

        <div className="space-y-1.5">
          <Input
            type="text"
            label="Referral Code (optional)"
            placeholder="e.g. LINA123"
            icon={<MdCardGiftcard className="text-xl" />}
            error={errors.referCode?.message}
            {...register("referCode")}
          />
          {currentReferCode && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 text-xs font-bold">✓</span>
              </div>
              <p className="text-xs text-emerald-700">
                Referral: <span className="font-semibold">{currentReferCode}</span>
              </p>
            </div>
          )}
        </div>

        <SubmitButton
          loading={isSubmitting}
          icon={<MdArrowForward className="text-xl" />}
        >
          Create account
        </SubmitButton>
      </form>
    </AuthCard>
  );
}