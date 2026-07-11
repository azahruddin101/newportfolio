import MinorSkill from "@/models/MinorSkill";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(MinorSkill);
export const GET = crud.getOne;
export const PUT = crud.update;
export const DELETE = crud.remove;
