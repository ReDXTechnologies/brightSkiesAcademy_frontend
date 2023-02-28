import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all teachers
  getTeachers(): Observable<Teacher[]> {
    const url = `${this.apiUrl}/teachers`;
    return this.http.get<Teacher[]>(url);
  }

  // Get teacher by ID
  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.apiUrl}/teacher/${id}`;
    return this.http.get<Teacher>(url);
  }


  // Update teacher
  updateTeacher(id: string, teacherData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, teacherData);
  }
  // Delete teacher
  deleteTeacher(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
