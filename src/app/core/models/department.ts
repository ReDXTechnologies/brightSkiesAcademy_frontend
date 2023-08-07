import {User} from "./user";

export class Department {
  id: number;
  name: string;
  super_department_head_of_super_department_firstName: string;
  super_department_head_of_super_department_lastName: string;
  head_of_super_department: User;
  head_of_sub_department: User;
  email: string;
  department_start_date: Date;
  isArchived: boolean;
  subDepNbTeachers: number;
  budget: number;
  super_department_name: string;
}
