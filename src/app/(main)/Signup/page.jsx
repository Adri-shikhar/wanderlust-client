"use client";

import Link from "next/link";
import { Button, Input, Label, Surface, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";

export default function SignupPage() {
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const photoUrl = formData.get("photoUrl");
    const email = formData.get("email");
    const password = formData.get("password");
console.log(name, phone, photoUrl, email, password);
    const { data, error } = await authClient.signUp.email({
        name: name,
        password: password || undefined || null,
        email: email || undefined || null,
        phone: phone || undefined || null,
        photoUrl: photoUrl || undefined || null,
    });
    if (error) {
        console.error(error.message);
    }
    if (data) {
        console.log(data.user);
    }
  };
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold text-neutral-900">
        Create account
      </h1>
      <p className="mb-6 text-sm text-neutral-600">
        Fill in the fields below.
      </p>
      <Surface variant="default" className="p-6">
        <form onSubmit={handleSignup} className="flex flex-col gap-4" method="post">
          <TextField className="w-full" name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Your full name" autoComplete="name" />
          </TextField>
          <TextField className="w-full" name="phone" type="tel">
            <Label>Phone number</Label>
            <Input placeholder="+1 555 000 0000" autoComplete="tel" />
          </TextField>
          <TextField className="w-full" name="photoUrl" type="url">
            <Label>Photo URL</Label>
            <Input
              placeholder="https://example.com/photo.jpg"
              autoComplete="off"
            />
          </TextField>
          <TextField className="w-full" name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="you@example.com" autoComplete="email" />
          </TextField>
          <TextField className="w-full" name="password" type="password">
            <Label>Password</Label>
            <Input
              placeholder="Choose a password"
              autoComplete="new-password"
            />
          </TextField>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <p className="text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="font-medium text-[#33A1C9] hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </Surface>
    </main>
  );
}
