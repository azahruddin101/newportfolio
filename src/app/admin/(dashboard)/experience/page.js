"use client";

import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminExperiencePage() {
  return (
    <ResourceManager
      title="Experience"
      endpoint="/api/experience"
      orderBy="order"
      columns={[
        { key: "role" },
        { key: "company", label: "Company" },
        { key: "type", label: "Type" },
        { key: "current", label: "Current", render: (v) => (v ? "Yes" : "No") },
      ]}
      fields={[
        { name: "company", label: "Company", type: "text", required: true },
        { name: "role", label: "Role", type: "text", required: true },
        { name: "type", label: "Type", type: "select", options: ["work", "milestone"], default: "work" },
        { name: "location", label: "Location", type: "text" },
        { name: "startDate", label: "Start date", type: "date" },
        { name: "endDate", label: "End date", type: "date", hint: "Leave empty if current" },
        { name: "current", label: "Current", type: "checkbox", checkboxLabel: "I currently work here", default: false },
        { name: "description", label: "Description", type: "textarea", rows: 4 },
        { name: "highlights", label: "Highlights", type: "lines", rows: 5 },
        { name: "technologies", label: "Technologies", type: "lines", rows: 4 },
        { name: "order", label: "Display order", type: "number", default: 0 },
      ]}
    />
  );
}
