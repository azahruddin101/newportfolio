"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { Field, Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/api/auth/login", form);
      toast.success("Welcome back, Azhar");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Login failed");
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ember-soft text-ember">
            <LockKeyhole size={22} />
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold text-cream">
            Admin <em className="font-serif italic font-normal text-ember">access</em>
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Authorized personnel only
          </p>
        </div>

        <form onSubmit={onSubmit} className="card-surface space-y-5 rounded-3xl p-8">
          <Field label="Email" id="admin-email">
            <Input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </Field>
          <Field label="Password" id="admin-password">
            <Input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </Field>
          <Button type="submit" disabled={busy} magnetic={false} className="w-full disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
