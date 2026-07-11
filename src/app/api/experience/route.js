import Experience from "@/models/Experience";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(Experience);
export const GET = crud.list;
export const POST = crud.create;
