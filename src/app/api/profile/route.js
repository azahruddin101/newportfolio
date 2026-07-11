import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import { requireAuth } from "@/lib/auth";
import { jsonError } from "@/lib/crud";

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne({}).lean();
    return NextResponse.json({ success: true, data: profile });
  } catch (err) {
    return jsonError(err);
  }
}

export async function PUT(request) {
  try {
    await requireAuth();
    await connectDB();
    const body = await request.json();
    const profile = await Profile.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    return NextResponse.json({ success: true, data: profile });
  } catch (err) {
    return jsonError(err);
  }
}
