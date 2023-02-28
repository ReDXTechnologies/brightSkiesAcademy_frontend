import { Role } from './role';
import {Gender} from "./gender";

export class User {
  id: number;
  email: string;
  password: string;
  mobile_phone: string;
  gender: Gender
  firstName: string;
  lastName: string;
  role: Role[];
  image: string;
  access?: string;
}
