"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

export default function SignupPage() {
  const router = useRouter();
  const [organisationName, setOrganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { organisation_name: organisationName || "My Organisation" },
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen">
      <SiteHeader
        right={
          <Link href="/login" className="btn btn-ghost">
            Log in
          </Link>
        }
      />
      <div className="mx-auto max-w-md px-5 py-10">
        <div className="panel rise p-7">
          <h1 className="font-display text-3xl">Create organiser account</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Launch events, generate QR codes, and track web + USSD votes.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label">Organisation</label>
              <input
                className="field"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                placeholder="Kenya Music Awards"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="field"
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating…" : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
