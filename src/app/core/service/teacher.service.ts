import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Course } from '../models/course';
import { Review } from '../models/review';
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
    const url = `${this.baseUrl}/teachers`;

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
  getAllInactiveTeacherss(): void {
    const url = `${this.baseUrl}/teachers/inactive`;
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

  getTeacherById(teacher_id:number): Observable<Teacher> {
    const url = `${this.baseUrl}/teacher/${teacher_id}`;

    return this.httpClient.get<Teacher>(url);
  }
  getTeacherCourses(teacher_id:number): Observable<Course[]>{
    const url = `${this.baseUrl}/teacher/${teacher_id}/courses`;
    console.log(url)
    return this.httpClient.get<Course[]>(url);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/teacher/${id}`);
  }
}
