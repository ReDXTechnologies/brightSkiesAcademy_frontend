import {User} from "./user";
import {Department} from "./department";
import {Course} from "./course";

export class Teacher extends User{
  degree: string;
  nb_of_students: number;
  biography: string;
  nb_of_courses: number;
  is_student_request_pending: boolean;
  department: string
  user : User
  courses : Course[]

}
