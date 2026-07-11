"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Generic admin CRUD screen driven by a field schema.
 *
 * Field types:
 *  - text | number | date | checkbox | textarea
 *  - select   → requires `options: []`
 *  - lines    → string[] edited as one item per line
 *  - json     → nested arrays/objects edited as JSON
 */
export default function ResourceManager({
  title,
  endpoint,
  fields,
  columns,
  orderBy,
}) {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null | {} (new) | doc
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await api.get(endpoint);
      setItems(data || []);
    } catch (err) {
      toast.error(err.message);
      setItems([]);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const emptyDoc = useMemo(() => {
    const doc = {};
    for (const f of fields) {
      doc[f.name] =
        f.default ??
        (f.type === "checkbox" ? false : f.type === "lines" || f.type === "json" ? f.emptyValue ?? [] : "");
    }
    return doc;
  }, [fields]);

  const startCreate = () => setEditing({ ...emptyDoc });
  const startEdit = (doc) => setEditing(JSON.parse(JSON.stringify(doc)));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = { ...editing };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;

      if (editing._id) {
        await api.put(`${endpoint}/${editing._id}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(endpoint, payload);
        toast.success(`${title} created`);
      }
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (doc) => {
    if (!confirm(`Delete “${doc[columns[0].key] || "this item"}”? This cannot be undone.`)) return;
    try {
      await api.delete(`${endpoint}/${doc._id}`);
      toast.success("Deleted");
      setItems((list) => list.filter((d) => d._id !== doc._id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const setField = (name, value) => setEditing((d) => ({ ...d, [name]: value }));

  const sorted = useMemo(() => {
    if (!items) return null;
    if (!orderBy) return items;
    return [...items].sort((a, b) => (a[orderBy] ?? 0) - (b[orderBy] ?? 0));
  }, [items, orderBy]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">{title}</h1>
          <p className="mt-1 font-mono text-xs text-muted">
            {items ? `${items.length} item(s)` : "Loading…"} · {endpoint}
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={load} variant="ghost" size="sm" magnetic={false} aria-label="Reload">
            <RefreshCw size={14} />
          </Button>
          <Button onClick={startCreate} size="sm" magnetic={false}>
            <Plus size={14} /> New
          </Button>
        </div>
      </div>

      {/* List */}
      {!sorted ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="card-surface rounded-2xl py-16 text-center">
          <p className="text-cream-dim">Nothing here yet.</p>
          <p className="mt-1 font-mono text-xs text-muted">
            Create your first entry — or run <code className="text-ember">npm run seed</code>.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((doc) => (
            <li
              key={doc._id}
              className="card-surface flex flex-wrap items-center gap-4 rounded-2xl p-5 transition-colors hover:border-line-strong"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-cream">{doc[columns[0].key]}</p>
                <p className="mt-0.5 flex flex-wrap gap-x-4 truncate font-mono text-xs text-muted">
                  {columns.slice(1).map((col) => (
                    <span key={col.key}>
                      {col.label}: {col.render ? col.render(doc[col.key], doc) : String(doc[col.key] ?? "—")}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(doc)}
                  aria-label="Edit"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-ember hover:text-ember"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => remove(doc)}
                  aria-label="Delete"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-ember-deep hover:text-ember-deep"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Editor drawer — Escape closes, first field autofocuses */}
      {editing && (
        <div
          className="fixed inset-0 z-[300] flex justify-end bg-ink/70 backdrop-blur-sm"
          onClick={() => setEditing(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${editing._id ? "Edit" : "Create"} ${title}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            ref={(el) => el?.querySelector("input, textarea, select")?.focus()}
            className="h-full w-full max-w-xl overflow-y-auto border-l border-line bg-ink-2 p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-cream">
                {editing._id ? "Edit" : "New"} <span className="text-ember">{title}</span>
              </h2>
              <button
                onClick={() => setEditing(null)}
                aria-label="Close editor"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream-dim hover:text-cream"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={save} className="space-y-5 pb-10">
              {fields.map((f) => (
                <Field key={f.name} label={f.label} id={`f-${f.name}`} hint={f.hint}>
                  <FieldControl field={f} value={editing[f.name]} onChange={(v) => setField(f.name, v)} />
                </Field>
              ))}
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={busy} magnetic={false} className="disabled:opacity-60">
                  {busy ? "Saving…" : "Save"}
                </Button>
                <Button type="button" variant="ghost" magnetic={false} onClick={() => setEditing(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldControl({ field, value, onChange }) {
  const id = `f-${field.name}`;

  switch (field.type) {
    case "textarea":
      return (
        <Textarea id={id} rows={field.rows || 4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required} />
      );
    case "number":
      return (
        <Input id={id} type="number" step={field.step || "any"} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} required={field.required} />
      );
    case "checkbox":
      return (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            id={id}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-(--ember)"
          />
          <span className="text-sm text-cream-dim">{field.checkboxLabel || "Enabled"}</span>
        </label>
      );
    case "date":
      return (
        <Input id={id} type="date" value={value ? String(value).slice(0, 10) : ""} onChange={(e) => onChange(e.target.value)} required={field.required} />
      );
    case "select":
      return (
        <Select id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required}>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      );
    case "lines":
      return (
        <Textarea
          id={id}
          rows={field.rows || 4}
          value={Array.isArray(value) ? value.join("\n") : value ?? ""}
          onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          placeholder="One item per line"
        />
      );
    case "json":
      return <JsonControl id={id} value={value} onChange={onChange} rows={field.rows || 8} />;
    default:
      return (
        <Input id={id} type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required} placeholder={field.placeholder} />
      );
  }
}

/** JSON editor that only commits valid JSON, with inline validity state. */
function JsonControl({ id, value, onChange, rows }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? [], null, 2));
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setText(JSON.stringify(value ?? [], null, 2));
    setValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Textarea
        id={id}
        rows={rows}
        value={text}
        className={`font-mono text-xs ${valid ? "" : "border-ember-deep"}`}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value));
            setValid(true);
          } catch {
            setValid(false);
          }
        }}
      />
      {!valid && <p className="mt-1 text-xs text-ember-deep">Invalid JSON — changes not applied</p>}
    </div>
  );
}
