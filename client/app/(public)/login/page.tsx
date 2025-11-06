"use client";

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
      
      await logIn(data)

      router.replace("/dashboard");
    } catch (err: any) {
      console.log(err?.response.data.message)
      setError("root", { type: "server", message: err?.response.data.message || "Login failed" });
    }
  };

  const rootError = (errors.root as any)?.message as string | undefined;

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {rootError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {rootError}
          </p>
        ) : null}

        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <SubmitButton loading={isSubmitting}>Sign in</SubmitButton>
      </form>
    </AuthCard>
  );
}
