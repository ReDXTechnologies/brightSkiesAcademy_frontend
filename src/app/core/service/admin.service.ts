import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from "../../../environments/environment";
import {Teacher} from "../models/teacher";
import {Course} from "../models/course";

@Injectable()
export class AdminService extends UnsubscribeOnDestroyAdapter {
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

  getUser(id: string) {
    return this.httpClient.get(`${this.baseUrl}/user/${id}`);
  }
  /** CRUD METHODS */
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

  getAllInactiveTeacherss(): Observable<Teacher[]> {
    const url = `${this.baseUrl}/teachers/inactive`;
    return this.httpClient.get<Teacher[]>(url);
  }

  getTeachers(): Observable<Teacher[]> {
    const url = `${this.baseUrl}/teachers/active`;

    return this.httpClient.get<Teacher[]>(url);
  }

  getTeacherCourses(id: number): Observable<Course[]> {
    const url = `${this.baseUrl}/teacher/${id}/courses`;

    return this.httpClient.get<Course[]>(url);
  }

  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.baseUrl}/teacher/${id}`;

    return this.httpClient.get<Teacher>(url);
  }

  updateTeacher(Teacher: Teacher): void {
    this.dialogData = Teacher;

    /* this.httpClient.put(this.API_URL + Teacher.id, Teacher).subscribe(data => {
      this.dialogData = Teacher;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  approveTeacherAccount(department_id: number, teacher_id: number): void {
    const url = `${this.baseUrl}/teacher/${teacher_id}/approve-account/${department_id}`;
    this.httpClient.delete(url).subscribe(data => {
        console.log(data)
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  rejectTeacherAccount(department_id: number, teacher_id: number): void {
    const url = `${this.baseUrl}/teacher/${teacher_id}/reject-account/${department_id}`;
    this.httpClient.delete(url).subscribe(data => {
        console.log(data)
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  launchSession(adminId: string, courseId: number): Observable<any> {
    const url = `${this.baseUrl}/launch-session-for-admin/${adminId}/course/${courseId}`;
    return this.httpClient.post<any>(url,{});
  }

  updateProfilePicture(userId: number, image: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/update-profile-picture/${userId}`, image);
  }

}
