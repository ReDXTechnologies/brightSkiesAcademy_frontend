import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Student>(url);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.apiUrl}${student.id}/`;
    return this.http.put<Student>(url, student);
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<Student>(url);
  }
}
