"use client";
import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { MdEmail, MdLock, MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validationSchemas/auth";
import Input from "@/components/input";
import SubmitButton from "@/components/button";
import AuthCard from "@/components/authCard";
import { useRouter } from "next/navigation";
import { logIn } from "@/controllers/user";

export type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await logIn(data);
      router.replace("/dashboard");
    } catch (err: any) {
      console.log(err?.response.data.message);
      setError("root", {
        type: "server",
        message: err?.response.data.message || "Login failed",
      });
    }
  };

  const rootError = (errors.root as any)?.message as string | undefined;

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your account to continue"
      icon={<MdLock className="text-3xl text-white" />}
      footer={
        <p>
          New here?{" "}
          <a
            href="/signup"
            className="font-semibold text-zinc-900 hover:underline underline-offset-4"
          >
            Create an account
          </a>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {rootError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <p>{rootError}</p>
          </div>
        )}

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
          placeholder="Enter your password"
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

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <SubmitButton
          loading={isSubmitting}
          icon={<MdArrowForward className="text-xl" />}
        >
          Sign in
        </SubmitButton>
      </form>
    </AuthCard>
  );
}