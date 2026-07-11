import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { requireAuth } from "@/lib/auth";
import { jsonError } from "@/lib/crud";

/** Admin: toggle read / update a message. */
export async function PATCH(request, { params }) {
  try {
    await requireAuth();
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const doc = await Message.findByIdAndUpdate(id, body, { new: true });
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

export async function DELETE(_request, { params }) {
  try {
    await requireAuth();
    await connectDB();
    const { id } = await params;
    const doc = await Message.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return jsonError(err);
  }
}
