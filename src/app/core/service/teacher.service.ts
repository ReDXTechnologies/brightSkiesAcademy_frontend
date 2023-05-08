import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../models/teacher";
@Injectable({
  providedIn: 'root'
})
export class TeacherService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  countChange : BehaviorSubject<any>= new BehaviorSubject<any>(0);
  totalItems : BehaviorSubject<any>= new BehaviorSubject<any>(0);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): any {
    return this.dataChange.value;

  }

  getDialogData() {
    return this.dialogData;
  }
  getTeacherManagers(teacherId: any): Observable<any> {
    const url = `${this.baseUrl}/teacher/${teacherId}/managers`;

    return this.httpClient.get<any>(url);
  }
  getSuperDepTeachers(superDepartmentId: any): Observable<any> {
    const url = `${this.baseUrl}/superdepartment/${superDepartmentId}/teacher_count`;

    return this.httpClient.get<any>(url);
  }
  getSubDepTeachers(subDepartmentId: any): Observable<any> {
    const url = `${this.baseUrl}/subdepartment/${subDepartmentId}/teacher_count`;

    return this.httpClient.get<any>(url);
  }
  getTeachers(): Observable<any> {
    const url = `${this.baseUrl}/teachers/active`;

    return this.httpClient.get<any>(url);
  }
  getSuperDepTeachersperPage(superDepartmentId: any,page:any): Observable<any> {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/teachers?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }
  getSubDepTeachersperPage(subDepartmentId: any,page:any): Observable<any> {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/teachers?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }
  getTeachersperPage(page:any): Observable<any> {
    const url = `${this.baseUrl}/teachers/active?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }


  getFilteredTeachersGrid( firstName: string, lastName: string,sub_department_name: string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/filtered_teachers?sub_department_name=${sub_department_name}&firstName=${firstName}&lastName=${lastName}`;

    if (sub_department_name) {
      params = params.set('sub_department_name', sub_department_name);
    }
    if (firstName) {
      params = params.set('firstName',firstName);
    }
    if (lastName) {
      params = params.set('lastName',lastName);
    }

  return this.httpClient.get<any>(url, { params })
  }

  getSuperDepFilteredTeachersGrid(superDepId: Object, firstName: string, lastName: string, sub_department_name: string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/super_department/${superDepId}/filtered_teachers?sub_department_name=${sub_department_name}&firstName=${firstName}&lastName=${lastName}`;

    if (sub_department_name) {
      params = params.set('sub_department_name', sub_department_name);
    }
    if (firstName) {
      params = params.set('firstName',firstName);
    }
    if (lastName) {
      params = params.set('lastName',lastName);
    }

    return this.httpClient.get<any>(url, { params })
  }

  getSubDepFilteredTeachersGrid(subDepId: Object, firstName: string, lastName: string, sub_department_name: string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/sub_department/${subDepId}/filtered_teachers?sub_department_name=${sub_department_name}&firstName=${firstName}&lastName=${lastName}`;

    if (sub_department_name) {
      params = params.set('sub_department_name', sub_department_name);
    }
    if (firstName) {
      params = params.set('firstName',firstName);
    }
    if (lastName) {
      params = params.set('lastName',lastName);
    }

    return this.httpClient.get<any>(url, { params })
  }
  getAllTeacherss(page:number): void {
    const url = `${this.baseUrl}/teachers/active?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    this.subs.sink = this.httpClient.get<any>(url, { params }).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.results);
        this.countChange.next(Math.ceil(data.count/8));
        this.totalItems.next(data.count);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSuperDepartmentTeachers(superDepartmentId: any,page:number):void  {
    console.log('here')
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/teachers?page=${page}`;
    let params = new HttpParams();
    params.set('page',page);
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
      (data) => {
        console.log(data)
        this.isTblLoading = false;
        this.dataChange.next(data.results);
        this.countChange.next(Math.ceil(data.count/8));
        this.totalItems.next(data.count);      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSubDepartmentTeachers(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/teachers`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.results);
        this.countChange.next(Math.ceil(data.count/8));
        this.totalItems.next(data.count);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllInactiveTeachers(): void {
    const url = `${this.baseUrl}/teachers/inactive`;
     this.httpClient.get<any>(url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.results);
        this.countChange.next(Math.ceil(data.count/8));
        this.totalItems.next(data.count);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getHybridProfilesRequests(): void {
    const url = `${this.baseUrl}/students/pending-teacher-requests`;
    this.httpClient.get<any>(url).subscribe(
      (data) => {
        console.log(data)
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSuperDepartmentHybridProfilesRequests(superDepartmentId: any):void  {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
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
  getSubDepartmentHybridProfilesRequests(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
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

  getSuperDepId(user_id: any){
    const url = `${this.baseUrl}/user/${user_id}/super_department_id`;

    return this.httpClient.get(url);
  }
  getSubDepId(user_id: any){
    const url = `${this.baseUrl}/user/${user_id}/sub_department_id`;

    return this.httpClient.get(url);
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
  updateTeacherProfile(teacher_id: number, teacher: any): Observable<Teacher> {

    const url = `${this.baseUrl}/teacher/${teacher_id}`;

    return this.httpClient.put<Teacher>(url,teacher);
  }
  deleteTeacher(teacher_id: number): Observable<Teacher> {

    const url = `${this.baseUrl}/teacher/${teacher_id}`;

    return this.httpClient.delete<Teacher>(url);
  }

  getPendingCourses(teacher_id: string): Observable<any>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/pending-courses`;
    console.log(url)
    return this.httpClient.get<any>(url);
  }

  getTeacherApprovedCourses(teacher_id: string, page: number): Observable<any>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/approved-courses?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }
  rejectTeacherAccount(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/teacher/${id}/reject-account`);
  }
  approveTeacherAccount(teacherId: number,departmentId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/teacher/${teacherId}/approve-account/${departmentId}`,{});
  }
  checkRequestStudentTeacherAccount(studentId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/check-teacher-request/${studentId}`);
  }
  requestStudentTeacherAccount(studentId: number,departmentId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/student/${studentId}/request-teacher-access/${departmentId}`,{});
  }
  approveStudentTeacherAccount(studentId: number,departmentId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/student/${studentId}/request-teacher-access/sub_dep/${departmentId}/approve`,{});
  }
  rejectStudentTeacherAccount(studentId: number,departmentId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/student/${studentId}/request-teacher-access/sub_dep/${departmentId}/reject`,{});
  }

  checkUserEnrollement(user_id: number, course_id:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/check-user-enrollement-request/${user_id}/course/${course_id}`);
  }
  requestCourseEnrollement(user_id: number, course_id:number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/course/${course_id}/enroll/${user_id}`,{});
  }
  approveUserEnrollement(userId: number,courseId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user/${userId}/request-user-enrollement-access/course/${courseId}/approve`,{});
  }
  rejectUserEnrollement(userId: number,courseId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user/${userId}/request-user-enrollement-access/course/${courseId}/reject`,{});
  }

  getEnrollementRequests(): void {
    const url = `${this.baseUrl}/users/pending-course-enrollement-requests`;
    this.httpClient.get<any>(url).subscribe(
      (data) => {
        console.log(data)
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSuperDepartmentPremuimCourseEnrollementRequests(superDepartmentId: any):void  {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/premuimCourseEnrollementRequests`;
    this.subs.sink = this.httpClient.get<any[]>(url).subscribe(
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
  getSubDepartmentPremuimCourseEnrollementRequests(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/premuimCourseEnrollementRequests`;
    this.subs.sink = this.httpClient.get<any[]>(url).subscribe(
      (data) => {
        console.log(data)
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
