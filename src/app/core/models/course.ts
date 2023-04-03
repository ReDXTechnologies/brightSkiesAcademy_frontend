import {Student} from "./student";
import {Teacher} from "./teacher";
import {Review} from "./review";
import {Module} from "./Module";

export class Course {
  id: number;
  title: string;
  workload: number; // camelCase naming convention
  nbr_of_lessons: number;
  total_enrolled: number;
  creation_date: Date;
  last_update_date: Date;
  free: boolean;
  price: number;
  max_student_length: number; // camelCase naming convention
  description: string;
  requirements: string;
  rate: number;
  nb_sessions: number;
  speciality: string;
  level: string;
  certificate: boolean;
  vm_characteristics: string; // camelCase naming convention
  student_emails_file: File; // Use File type for file fields
  labFiles: File;
  image: File;
  teachers: Teacher[]
  teacherDetails: Teacher[]
  students: Student[]
  reviews: Review[]
  status: string;
  what_you_will_learn: string
  session_duration: string
  modules : Module[]
}


export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}
