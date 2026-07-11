"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminSkillsPage() {
  return (
    <ResourceManager
      title="Major Skills"
      endpoint="/api/skills"
      orderBy="order"
      columns={[
        { key: "title" },
        { key: "skills", label: "Skills", render: (v) => `${(v || []).length} skill(s)` },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Category title", type: "text", required: true, placeholder: "Frontend" },
        {
          name: "icon",
          label: "Icon",
          type: "select",
          options: ["layout", "server", "database", "sparkles", "wrench"],
          default: "sparkles",
        },
        { name: "order", label: "Display order", type: "number", default: 0 },
        {
          name: "skills",
          label: "Skills (JSON)",
          type: "json",
          rows: 12,
          emptyValue: [{ name: "React.js", level: 90, note: "" }],
          hint: 'Array of { "name", "level" (0-100), "note" }',
        },
      ]}
    />
  );
}
