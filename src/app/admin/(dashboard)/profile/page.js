"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { Field, Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

const TEXT_FIELDS = [
  ["name", "Name"],
  ["title", "Title"],
  ["tagline", "Tagline"],
  ["resumeUrl", "Resume URL"],
  ["github", "GitHub URL"],
  ["linkedin", "LinkedIn URL"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["location", "Location"],
  ["availability", "Availability"],
];

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .get("/api/profile")
      .then((data) => setProfile(data || {}))
      .catch((err) => {
        toast.error(err.message);
        setProfile({});
      });
  }, []);

  const set = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));

  const setJson = (key) => (e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setProfile((p) => ({ ...p, [key]: parsed, [`__${key}Invalid`]: false, [`__${key}Text`]: e.target.value }));
    } catch {
      setProfile((p) => ({ ...p, [`__${key}Invalid`]: true, [`__${key}Text`]: e.target.value }));
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = { ...profile };
      for (const key of Object.keys(payload)) {
        if (key.startsWith("__") || ["_id", "__v", "createdAt", "updatedAt"].includes(key)) {
          delete payload[key];
        }
      }
      await api.put("/api/profile", payload);
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!profile) {
    return (
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-10 w-1/2" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-cream">Profile</h1>
      <p className="mt-1 font-mono text-xs text-muted">
        Personal information shown across the site
      </p>

      <form onSubmit={save} className="mt-8 space-y-5 pb-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {TEXT_FIELDS.map(([key, label]) => (
            <Field key={key} label={label} id={`p-${key}`}>
              <Input id={`p-${key}`} value={profile[key] ?? ""} onChange={set(key)} />
            </Field>
          ))}
        </div>

        <Field label="Short about (cards & meta)" id="p-shortAbout">
          <Textarea id="p-shortAbout" rows={3} value={profile.shortAbout ?? ""} onChange={set("shortAbout")} />
        </Field>

        <Field label="About (blank line between paragraphs)" id="p-about">
          <Textarea id="p-about" rows={10} value={profile.about ?? ""} onChange={set("about")} />
        </Field>

        <Field
          label="Stats (JSON)"
          id="p-stats"
          hint='Array of { "label", "value" (number), "suffix" }'
        >
          <Textarea
            id="p-stats"
            rows={7}
            className={`font-mono text-xs ${profile.__statsInvalid ? "border-ember-deep" : ""}`}
            value={profile.__statsText ?? JSON.stringify(profile.stats ?? [], null, 2)}
            onChange={setJson("stats")}
          />
        </Field>

        <Field
          label="Social links (JSON)"
          id="p-socialLinks"
          hint='Array of { "label", "url", "icon" }'
        >
          <Textarea
            id="p-socialLinks"
            rows={7}
            className={`font-mono text-xs ${profile.__socialLinksInvalid ? "border-ember-deep" : ""}`}
            value={profile.__socialLinksText ?? JSON.stringify(profile.socialLinks ?? [], null, 2)}
            onChange={setJson("socialLinks")}
          />
        </Field>

        <Button type="submit" disabled={busy} magnetic={false} className="disabled:opacity-60">
          {busy ? "Saving…" : "Save profile"}
        </Button>
      </form>
    </div>
  );
}
