"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}) {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        ref={modalRef}
        className="card-surface w-full max-w-md overflow-hidden rounded-2xl border border-line bg-ink-2 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {variant === "danger" && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-deep/15 text-ember-deep border border-ember-deep/20">
                <AlertTriangle size={20} />
              </div>
            )}
            <h2 id="confirm-modal-title" className="font-display text-lg font-bold text-cream">
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:text-cream"
          >
            <X size={14} />
          </button>
        </div>

        {/* Message */}
        <div className="mt-4">
          <p className="text-sm leading-relaxed text-cream-dim">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel} magnetic={false}>
            {cancelText}
          </Button>
          <Button variant={variant} size="sm" onClick={onConfirm} magnetic={false}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
