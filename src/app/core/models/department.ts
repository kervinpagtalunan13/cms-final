import { Subject } from "./subject";
import { User } from "./user";

export interface Department{
  id: number;
  department_code: string;
  description: string;
  chairs: string;
  created_at: string
  updated_at: string;
  members: User[],
  subjects: Subject[]
}