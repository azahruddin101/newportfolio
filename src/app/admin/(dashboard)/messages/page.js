"use client";

import { useEffect, useState } from "react";
import { MailOpen, Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    api
      .get("/api/contact")
      .then(setMessages)
      .catch((err) => {
        toast.error(err.message);
        setMessages([]);
      });
  }, []);

  const toggleRead = async (msg) => {
    try {
      const updated = await api.patch(`/api/contact/${msg._id}`, { read: !msg.read });
      setMessages((list) => list.map((m) => (m._id === msg._id ? updated : m)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (msg) => {
    if (!confirm(`Delete message from ${msg.name}?`)) return;
    try {
      await api.delete(`/api/contact/${msg._id}`);
      setMessages((list) => list.filter((m) => m._id !== msg._id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const unread = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-cream">Messages</h1>
      <p className="mt-1 font-mono text-xs text-muted">
        {messages ? `${messages.length} total · ${unread} unread` : "Loading…"}
      </p>

      <div className="mt-8 space-y-4 pb-16">
        {!messages ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
        ) : messages.length === 0 ? (
          <div className="card-surface rounded-2xl py-16 text-center text-cream-dim">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <article
              key={msg._id}
              className={cn(
                "card-surface rounded-2xl p-6 transition-colors",
                !msg.read && "border-ember/30"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-medium text-cream">
                    {!msg.read && <span className="h-2 w-2 rounded-full bg-ember" aria-label="Unread" />}
                    {msg.name}
                    <a href={`mailto:${msg.email}`} className="font-mono text-xs text-ember hover:underline">
                      {msg.email}
                    </a>
                  </p>
                  {msg.subject && <p className="mt-1 text-sm text-cream-dim">{msg.subject}</p>}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-cream-dim">
                {msg.message}
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => toggleRead(msg)}
                  className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cream-dim transition-colors hover:border-ember hover:text-ember"
                >
                  {msg.read ? <Mail size={12} /> : <MailOpen size={12} />}
                  Mark {msg.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => remove(msg)}
                  className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cream-dim transition-colors hover:border-ember-deep hover:text-ember-deep"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
