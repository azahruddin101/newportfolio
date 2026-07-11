import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export function jsonError(err) {
  const status = err.status || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";
  if (status === 500) console.error(err);
  return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * Builds standard REST handlers for a Mongoose model.
 * GET (list) is public; POST/PUT/DELETE require an admin session.
 */
export function createCrudHandlers(Model, { sort = { order: 1, createdAt: -1 } } = {}) {
  return {
    async list() {
      try {
        await connectDB();
        const docs = await Model.find({}).sort(sort).lean();
        return NextResponse.json({ success: true, data: docs });
      } catch (err) {
        return jsonError(err);
      }
    },

    async create(request) {
      try {
        await requireAuth();
        await connectDB();
        const body = await request.json();
        const doc = await Model.create(body);
        return NextResponse.json({ success: true, data: doc }, { status: 201 });
      } catch (err) {
        return jsonError(err);
      }
    },

    async getOne(_request, { params }) {
      try {
        await connectDB();
        const { id } = await params;
        const doc = await Model.findById(id).lean();
        if (!doc) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));
        return NextResponse.json({ success: true, data: doc });
      } catch (err) {
        return jsonError(err);
      }
    },

    async update(request, { params }) {
      try {
        await requireAuth();
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const doc = await Model.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!doc) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));
        return NextResponse.json({ success: true, data: doc });
      } catch (err) {
        return jsonError(err);
      }
    },

    async remove(_request, { params }) {
      try {
        await requireAuth();
        await connectDB();
        const { id } = await params;
        const doc = await Model.findByIdAndDelete(id);
        if (!doc) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));
        return NextResponse.json({ success: true, data: doc });
      } catch (err) {
        return jsonError(err);
      }
    },
  };
}
