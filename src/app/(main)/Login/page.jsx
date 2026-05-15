"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Surface, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      return;
    }
    if (data) {
      router.push("/Profile");
      router.refresh();
    }
  };
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Log in</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Enter your email and password to continue.
      </p>
      <Surface variant="default" className="p-6">
        <form onSubmit={handleLogin} className="flex flex-col gap-4" method="post">
          <TextField className="w-full" name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" autoComplete="email" />
          </TextField>
          <TextField className="w-full" name="password" type="password">
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </TextField>
          <Button type="submit" className="w-full">
            Log in
          </Button>
          <p className="text-center text-sm text-neutral-600">
            No account?{" "}
            <Link
              href="/Signup"
              className="font-medium text-[#33A1C9] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Surface>
    </main>
  );
}
