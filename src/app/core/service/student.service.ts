import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  getAllStudents(): void {
    const url = `${this.apiUrl}/students`;
    this.subs.sink = this.http.get<Student[]>(url).subscribe(
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

  enrollStudent(courseId: number, studentId: string): Observable<any> {
    const url = `${this.apiUrl}/courses/${courseId}/enroll/${studentId}`;
    return this.http.post(url, {});
  }
  isEnrolled(courseId: number, studentId: string): Observable<{ enrolled: boolean }> {
    const url = `${this.apiUrl}/courses/${courseId}/students/${studentId}/enrolled`;
    return this.http.get<{ enrolled: boolean }>(url);
  }
  launchSession(studentId: string, courseId: number): Observable<any> {
    const url = `${this.apiUrl}/course/${courseId}/student/${studentId}/launch-session`;
    return this.http.post<any>(url,{});
  }

  getStudent(id: string): Observable<Student> {
    const url = `${this.apiUrl}/student/${id}`;
    return this.http.get<Student>(url);
  }
  getStudentCourses(id: string): Observable<Course[]> {
    const url = `${this.apiUrl}/students/${id}/courses`;
    return this.http.get<Course[]>(url);
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
