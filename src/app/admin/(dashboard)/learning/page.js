"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminLearningPage() {
  return (
    <ResourceManager
      title="Currently Learning"
      endpoint="/api/learning"
      orderBy="order"
      columns={[
        { key: "skill" },
        { key: "progress", label: "Progress", render: (v) => `${v}%` },
        { key: "category", label: "Category" },
      ]}
      fields={[
        { name: "skill", label: "Skill", type: "text", required: true },
        { name: "progress", label: "Progress (0–100)", type: "number", default: 0 },
        { name: "category", label: "Category", type: "text" },
        { name: "startedDate", label: "Started", type: "date" },
        { name: "description", label: "Description", type: "textarea", rows: 3 },
        { name: "order", label: "Display order", type: "number", default: 0 },
      ]}
    />
  );
}
