import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Course } from '../models/course';
import { Review } from '../models/review';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../models/teacher";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Course[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // getPendingCourses(): Observable<Course[]> {
  //   const url = `${this.baseUrl}/pending-courses`;
  //
  //   return this.http.get<Course[]>(url);
  // }
  getPendingCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/pending-courses`;
   return this.httpClient.get<Course[]>(url);
  }

  getSuperDepPendingCourses(dep_id: any): Observable<Course[]> {
    const url = `${this.baseUrl}/superdepartments/${dep_id}/courses/pending`;
    return this.httpClient.get<Course[]>(url);
  }
  getSubDepPendingCourses(dep_id : any): Observable<Course[]> {
    const url = `${this.baseUrl}/subdepartments/${dep_id}/courses/pending`;
    return this.httpClient.get<Course[]>(url);
  }





  getApprovedCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/approved-courses`;

    return this.httpClient.get<Course[]>(url);
  }

  approveCourse(course_id:number): Observable<Course> {
    const url = `${this.baseUrl}/course/${course_id}/approve`;

    return this.httpClient.post<Course>(url,{});
  }
  createCustomAMI(course_id:number): Observable<Course> {
    const url = `${this.baseUrl}/course/${course_id}/create_custom_ami`;

    return this.httpClient.post<Course>(url,{});
  }

  rejectCourse(course_id:number){
    const url = `${this.baseUrl}/courses/${course_id}/reject`;
    console.log(url)
    return this.httpClient.delete(url);
  }
  getCourseById(course_id:number): Observable<Course>{
    const url = `${this.baseUrl}/courses/${course_id}`;
    return this.httpClient.get<Course>(url);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/${id}`);
  }

  createCourse(teacherId: string, formData: FormData, free: boolean, certified: boolean) : Observable<Course> {
    const url = `${this.baseUrl}/course/create/${teacherId}?free=${free}&certificate=${certified}`;
    return this.httpClient.post<Course>(url, formData);
  }

  updateCourse(courseId: number, teacherId: string, formData: FormData, free: boolean, certified: boolean) : Observable<Course> {
    const url = `${this.baseUrl}/teacher/${teacherId}/course/${courseId}/update?free=${free}&certificate=${certified}`;
    return this.httpClient.put<Course>(url, formData);
  }

  getFilteredCourses(sub_department: string[], level: string, workload_range: string,title_regex:string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/courses?sub_department=${sub_department}&level=${level}&workload_range=${workload_range}&title_regex=${title_regex}`;

    if (sub_department.length > 0) {
      params = params.set('sub_department', sub_department.join(','));
    }
    if (level) {
      params = params.set('level', level);
    }
    if (workload_range) {
      params = params.set('workload_range',workload_range);
    }
    if (title_regex) {
      params = params.set('title_regex',title_regex);
    }
    return this.httpClient.get<any>(url, { params });
  }
  getFilteredPendingCourses(sub_department: string[]): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/courses/pending_filter?sub_department=${sub_department}`;

    if (sub_department.length > 0) {
      params = params.set('sub_department', sub_department.join(','));
    }
    return this.httpClient.get<any>(url, { params });
  }

  getSuperDepartmentPremuinCourseEnrollementRequests(superDepartmentId: any):void  {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<Course[]>(url).subscribe(
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
  getSubDepartmentPremuinCourseEnrollementRequests(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<Course[]>(url).subscribe(
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
}
