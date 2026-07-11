import MinorProject from "@/models/MinorProject";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(MinorProject);
export const GET = crud.getOne;
export const PUT = crud.update;
export const DELETE = crud.remove;
