import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Student } from '../models/student';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {Course} from "../models/course";

@Injectable()
export class StudentService extends UnsubscribeOnDestroyAdapter {
  private readonly apiUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  countChange : BehaviorSubject<any>= new BehaviorSubject<any>(0);
  totalItems : BehaviorSubject<any>= new BehaviorSubject<any>(0);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private http: HttpClient) {
    super();
  }
  get data(): Student[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStudents(page:number): void {
    const url = `${this.apiUrl}/students?page=${page}`;
    this.subs.sink = this.http.get<any>(url).subscribe(
      (data) => {
        console.log(data)
        this.isTblLoading = false;
        this.dataChange.next(data.results);
        this.countChange.next(Math.ceil(data.count/10));
        console.log(Math.ceil(data.count/10))
        this.totalItems.next(data.count);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getFilteredStudentsGrid(certificate: any, firstName: string, lastName: string, specialty: string, skills: string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.apiUrl}/filtered_students/?specialty=${specialty}&firstName=${firstName}&lastName=${lastName}&certificate=${certificate}&skills=${skills}`;

    if (specialty) {
      params = params.set('specialty', specialty);
    }
    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    if (certificate) {
      params = params.set('certificate', certificate);
    }
    if (skills) {
      params = params.set('skills', skills);
    }

    return this.http.get<any>(url, { params });
  }

  enrollStudent(courseId: number, studentId: string): Observable<any> {
    const url = `${this.apiUrl}/courses/${courseId}/enroll/${studentId}`;
    return this.http.post(url, {});
  }

  isEnrolled(courseId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/course/${courseId}/user/${userId}/enrolled`;
    return this.http.get(url);
  }

  launchSession(studentId: number, courseId: number,lab_id:number): Observable<any> {
    const url = `${this.apiUrl}/launch_instance/course/${courseId}/lab/${lab_id}/student/${studentId}`;
    return this.http.post<any>(url,{});
  }
  remainingSessions(studentId: number, courseId: number,lab_id:number): Observable<any> {
    const url = `${this.apiUrl}/course/${courseId}/lab/${lab_id}/student/${studentId}/instances`;
    return this.http.get<any>(url,{});
  }
  createStudentProgress(studentId: number, courseId: number): Observable<any> {
    const url = `${this.apiUrl}/course/${courseId}/student/${studentId}/addProgress`;
    return this.http.post<any>(url,{});
  }

  getStudent(id: string): Observable<Student> {
    const url = `${this.apiUrl}/student/${id}`;
    return this.http.get<Student>(url);
  }
  getStudentCourses(id: string,page:number): Observable<any> {
    const url = `${this.apiUrl}/students/${id}/courses?page=${page}`;
    return this.http.get<any>(url);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(student_id:number,student: any): Observable<Student> {
    this.dialogData =student;
    const url = `${this.apiUrl}/student/${student_id}`;
    return this.http.put<Student>(url, student);
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/student/${id}`;
    return this.http.delete<Student>(url);
  }


}
