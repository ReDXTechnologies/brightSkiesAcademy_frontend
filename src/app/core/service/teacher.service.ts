import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Course} from '../models/course';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../models/teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Teacher[]> = new BehaviorSubject<Teacher[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teacher[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getTeachers(): Observable<Teacher[]> {
    const url = `${this.baseUrl}/teachers/active`;

    return this.httpClient.get<Teacher[]>(url);
  }
  getAllTeacherss(): void {
    const url = `${this.baseUrl}/teachers/active`;
    this.subs.sink = this.httpClient.get<Teacher[]>(url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllInactiveTeachers(): void {
    const url = `${this.baseUrl}/teachers/inactive`;
     this.httpClient.get<Teacher[]>(url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  getTeacherById(teacher_id: any): Observable<Teacher> {
    const url = `${this.baseUrl}/teacher/${teacher_id}`;

    return this.httpClient.get<Teacher>(url);
  }

  updateTeacher(teacher_id: number, teacher: { degree: any;user: { firstName: any; lastName: any; gender: any; mobile_phone: any; email: any } }, department_name: string): Observable<Teacher> {
    // Set the dialogData property to the new object
    this.dialogData = {
      teacher,
      department_name
    };

    const url = `${this.baseUrl}/teacher/${teacher_id}?department_name=${department_name}`;

    return this.httpClient.put<Teacher>(url,teacher);
  }
  deleteTeacher(teacher_id: number): Observable<Teacher> {

    const url = `${this.baseUrl}/teacher/${teacher_id}`;

    return this.httpClient.delete<Teacher>(url);
  }

  getPendingCourses(teacher_id: string): Observable<Course[]>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/pending-courses`;
    console.log(url)
    return this.httpClient.get<Course[]>(url);
  }

  getApprovedCourses(teacher_id: string): Observable<Course[]>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/approved-courses`;
    console.log(url)
    return this.httpClient.get<Course[]>(url);
  }

  rejectTeacherAccount(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/teacher/${id}/reject-account`);
  }
  approveTeacherAccount(teacherId: number,departmentId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/teacher/${teacherId}/approve-account/${departmentId}`,{});
  }
}
