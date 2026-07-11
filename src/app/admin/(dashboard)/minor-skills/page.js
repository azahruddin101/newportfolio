"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminMinorSkillsPage() {
  return (
    <ResourceManager
      title="Minor Skills"
      endpoint="/api/minor-skills"
      orderBy="order"
      columns={[
        { key: "name" },
        { key: "category", label: "Group" },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "category", label: "Group", type: "text", placeholder: "Backend / Services / Tools…" },
        { name: "order", label: "Display order", type: "number", default: 0 },
      ]}
    />
  );
}
