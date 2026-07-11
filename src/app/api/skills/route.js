import SkillCategory from "@/models/SkillCategory";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(SkillCategory);
export const GET = crud.list;
export const POST = crud.create;
