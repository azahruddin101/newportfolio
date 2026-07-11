import MinorSkill from "@/models/MinorSkill";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(MinorSkill);
export const GET = crud.list;
export const POST = crud.create;
