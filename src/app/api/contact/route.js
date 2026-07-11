import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { requireAuth } from "@/lib/auth";
import { jsonError } from "@/lib/crud";
import { sendContactEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public: submit a contact message. */
export async function POST(request) {
  try {
    const { name, email, subject = "", message } = await request.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json(
        { success: false, error: "A valid email is required" },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long" },
        { status: 400 }
      );
    }

    await connectDB();
    const doc = await Message.create({ name, email, subject, message });

    // Email delivery is best-effort; storage is the source of truth.
    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailErr) {
      console.error("Contact email failed:", emailErr.message);
    }

    return NextResponse.json({ success: true, data: { id: doc._id } }, { status: 201 });
  } catch (err) {
    return jsonError(err);
  }
}

/** Admin: list all messages. */
export async function GET() {
  try {
    await requireAuth();
    await connectDB();
    const docs = await Message.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: docs });
  } catch (err) {
    return jsonError(err);
  }
}
