import { Department } from "./department";
import { TimeStamp } from "./timestamp";
import { User } from "./user";

export interface Curriculum {
  title: string;
  version: string;
  date: string;
  author: string;
  role: string;
  status: string;
  isCurrent: string;
}

export interface Curriculum2 extends TimeStamp{
  id: number
  user_id: number
  department_id: number
  version: string
  metadata: string
  status: string
  user?: User,
  department: Department,
  is_new: boolean
}