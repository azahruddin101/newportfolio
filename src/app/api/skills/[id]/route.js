import SkillCategory from "@/models/SkillCategory";
import { createCrudHandlers } from "@/lib/crud";

const crud = createCrudHandlers(SkillCategory);
export const GET = crud.getOne;
export const PUT = crud.update;
export const DELETE = crud.remove;
