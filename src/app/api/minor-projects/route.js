import MinorProject from "@/models/MinorProject";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(MinorProject);
export const GET = crud.list;
export const POST = crud.create;
