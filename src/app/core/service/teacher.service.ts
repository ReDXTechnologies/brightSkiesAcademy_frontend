import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
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
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
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
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/teachers`;

    return this.httpClient.get<any>(url);
  }
  getSubDepTeachers(subDepartmentId: any): Observable<any> {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/teachers`;

    return this.httpClient.get<any>(url);
  }
  getTeachers(): Observable<any> {
    const url = `${this.baseUrl}/teachers/active`;

    return this.httpClient.get<any>(url);
  }
  getAllTeacherss(): void {
    const url = `${this.baseUrl}/teachers/active`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.results);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSuperDepartmentTeachers(superDepartmentId: any):void  {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/teachers`;
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
  getFilteredTeachers(sub_department_name: string, firstName: string, lastName: string,super_department_id:number): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/filtered_teachers?sub_department_name=${sub_department_name}&firstName=${firstName}&lastName=${lastName}&super_department_id=${super_department_id}`;

    if (super_department_id) {
      params = params.set('super_department_id', super_department_id);
    }
    if (sub_department_name) {
      params = params.set('sub_department_name', sub_department_name);
    }
    if (firstName) {
      params = params.set('firstName',firstName);
    }
    if (lastName) {
      params = params.set('lastName',lastName);
    }

    return this.httpClient.get<any>(url, { params });
  }
  getSubDepartmentTeachers(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/teachers`;
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
  getAllInactiveTeachers(): void {
    const url = `${this.baseUrl}/teachers/inactive`;
     this.httpClient.get<any>(url).subscribe(
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

  getTeacherApprovedCourses(teacher_id: string): Observable<any>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/approved-courses`;
    console.log(url)
    return this.httpClient.get<any>(url);
  }
  getApprovedCourses(): Observable<any>{
    const url = `${this.baseUrl}/approved-courses`;
    console.log(url)
    return this.httpClient.get<any>(url);
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
