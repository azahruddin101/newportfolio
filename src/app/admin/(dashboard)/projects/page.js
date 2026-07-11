"use client";

import ResourceManager from "@/components/admin/ResourceManager";

const STATUS = ["In Production", "In Development", "Completed", "Archived"];

export default function AdminProjectsPage() {
  return (
    <ResourceManager
      title="Major Projects"
      endpoint="/api/projects"
      orderBy="order"
      columns={[
        { key: "title" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "featured", label: "Featured", render: (v) => (v ? "Yes" : "No") },
        { key: "order", label: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true, hint: "URL identifier, e.g. astrobharat-ai" },
        { name: "description", label: "Short description", type: "textarea", rows: 3, required: true },
        { name: "longDescription", label: "Long description", type: "textarea", rows: 8, hint: "Separate paragraphs with a blank line" },
        { name: "features", label: "Features", type: "lines", rows: 6 },
        { name: "challenges", label: "Challenges", type: "lines", rows: 4 },
        { name: "solutions", label: "Solutions", type: "lines", rows: 4 },
        { name: "technologies", label: "Technologies", type: "lines", rows: 5 },
        { name: "images", label: "Image URLs", type: "lines", rows: 3 },
        { name: "videos", label: "Video URLs", type: "lines", rows: 2 },
        { name: "github", label: "GitHub URL", type: "text" },
        { name: "liveDemo", label: "Live demo URL", type: "text" },
        { name: "category", label: "Category", type: "text", default: "Full Stack" },
        { name: "timeline", label: "Timeline", type: "text", placeholder: "2025 — Present" },
        { name: "teamSize", label: "Team size", type: "text" },
        { name: "role", label: "My role", type: "text" },
        { name: "status", label: "Status", type: "select", options: STATUS, default: "Completed" },
        { name: "featured", label: "Featured", type: "checkbox", checkboxLabel: "Show on the home page", default: false },
        { name: "order", label: "Display order", type: "number", default: 0 },
        { name: "accent", label: "Accent color", type: "text", default: "#a35e47", hint: "Hex color used for the card glow" },
      ]}
    />
  );
}
