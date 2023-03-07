import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Course } from '../models/course';
import { Review } from '../models/review';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";

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
  getApprovedCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}/approved-courses`;

    return this.httpClient.get<Course[]>(url);
  }

  approveCourse(course_id:number): Observable<Course> {
    const url = `${this.baseUrl}/courses/${course_id}/approve`;

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
}
