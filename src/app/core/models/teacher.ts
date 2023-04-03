import {User} from "./user";
import {Department} from "./department";
import {Course} from "./course";

export class Teacher {
  degree: string;
  nb_of_students: number;
  biography: string;
  nb_of_courses: number;
  is_student_request_pending: boolean;
  sub_department: Department
  user : User
  courses : Course[]

}
