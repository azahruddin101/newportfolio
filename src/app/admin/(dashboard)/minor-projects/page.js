"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminMinorProjectsPage() {
  return (
    <ResourceManager
      title="Minor Projects"
      endpoint="/api/minor-projects"
      orderBy="order"
      columns={[
        { key: "title" },
        { key: "techStack", label: "Tech", render: (v) => (v || []).join(", ") },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", rows: 3 },
        { name: "techStack", label: "Tech stack", type: "lines", rows: 4 },
        { name: "github", label: "GitHub URL", type: "text" },
        { name: "demo", label: "Demo URL", type: "text" },
        { name: "image", label: "Image URL", type: "text" },
        { name: "order", label: "Display order", type: "number", default: 0 },
      ]}
    />
  );
}
