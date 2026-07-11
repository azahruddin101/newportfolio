import Learning from "@/models/Learning";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(Learning);
export const GET = crud.getOne;
export const PUT = crud.update;
export const DELETE = crud.remove;
