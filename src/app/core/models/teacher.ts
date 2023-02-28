import {User} from "./user";

export class Teacher extends User{
  degree: string;
  nb_of_students: number;
  biography: string;
  nb_of_courses: number;
  is_student_request_pending: boolean;

}
