import {Student} from "./student";
import {Teacher} from "./teacher";

export class Course {
  id: number;
  title: string;
  // students: Student[];
  // teachers: Teacher[];
  time_length: number; // camelCase naming convention
  nbrOfLessons: number;
  total_enrolled: number;
  creation_date: Date;
  last_update_date: Date;
  free: boolean;
  price: number;
  max_student_length: number; // camelCase naming convention
  description: string;
  requirements: string;
  rate: number;
  field: string;
  level: string;
  certificate: boolean;
  vm_characteristics: string; // camelCase naming convention
  student_emails_file: File; // Use File type for file fields
  labFiles: File;
  image: File;
  status: string;
}


export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}
