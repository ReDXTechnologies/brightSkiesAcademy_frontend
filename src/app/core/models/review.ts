import {Course} from "./course";
import {Student} from "./student";

export class Review {
  id: number;
  reviewer: Student;
  email: string;
  name: string;
  comment: string;
  rate: number;
  course: Course;
  created_at: Date; // camelCase naming convention
}
