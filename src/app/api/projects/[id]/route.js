import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { createCrudHandlers, jsonError } from "@/lib/crud";

const crud = createCrudHandlers(Project);

/** GET by Mongo id or slug. */
export async function GET(_request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const doc = await Project.findOne(query).lean();
    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    return jsonError(err);
  }
}

export const PUT = crud.update;
export const DELETE = crud.remove;
