import Experience from "@/models/Experience";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(Experience);
export const GET = crud.getOne;
export const PUT = crud.update;
export const DELETE = crud.remove;
