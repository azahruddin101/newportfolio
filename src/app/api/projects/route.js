import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { createCrudHandlers, jsonError } from "@/lib/crud";

const crud = createCrudHandlers(Project);

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const filter = {};
    if (searchParams.get("featured") === "true") filter.featured = true;
    const category = searchParams.get("category");
    if (category && category !== "All") filter.category = category;
    const q = searchParams.get("q");
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { technologies: { $regex: q, $options: "i" } },
      ];
    }
    const docs = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: docs });
  } catch (err) {
    return jsonError(err);
  }
}

export const POST = crud.create;
