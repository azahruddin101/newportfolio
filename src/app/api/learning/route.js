import Learning from "@/models/Learning";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(Learning);
export const GET = crud.list;
export const POST = crud.create;
