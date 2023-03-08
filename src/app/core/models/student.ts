import {Role} from "./role";
import {User} from "./user";

export class Student {
  skills: string;
  speciality: string;
  grades: JSON;
  is_teacher_request_pending: boolean;
  user: User;

}
