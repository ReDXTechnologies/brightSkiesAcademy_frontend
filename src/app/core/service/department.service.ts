import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Department } from '../models/department';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {User} from "../models/user";
import {map} from "rxjs/operators";
import {Teacher} from "../models/teacher";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends UnsubscribeOnDestroyAdapter{
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private http: HttpClient) {
    super();

  }
  getHeadsOfSuperDepartments(): Observable<User[]> {
    const url = `${this.baseUrl}/super-department-heads`;

    return this.http.get<User[]>(url);
  }
  getHeadsOfSubDepartments(): Observable<User[]> {
    const url = `${this.baseUrl}/sub-department-heads`;

    return this.http.get<User[]>(url);
  }
  getAllSuperDepartments(): void {
    const url = `${this.baseUrl}/super-departments`;

    this.subs.sink = this.http.get<Department[]>(url).subscribe(
      (data) => {
        console.log("sub****************",data)
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllSubDepartments(): void {
    const url = `${this.baseUrl}/sub-departments`;

    this.subs.sink = this.http.get<Department[]>(url).subscribe(
      (data) => {
        console.log("sub****************",data)
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getSuperDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}/super-departments`;

     return this.http.get<Department[]>(url);
  }


  getSubDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}/sub-departments`;

    return this.http.get<Department[]>(url);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}${id}/`);
  }

  createSuperDepartment(department: { name: string; department_start_date: string;  email: any;  }, head_id: string): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/super-departments/create/${head_id}`, department);
  }
  createSubDepartment(department: { name: string; super_department:any; department_start_date: string;  email: any;  }, head_id: string): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/sub-departments/create/${head_id}`, department);
  }


  getDialogData() {
    return this.dialogData;
  }
  get data(): Department[] {
    return this.dataChange.value;
  }

  updateDepartment(department: { name: string; department_start_date: string; head_of_department: any; email: any }, id: string): void {
    this.dialogData = department;
    this.http.put(`${this.baseUrl}/departments/${id}`,department).subscribe(data => {
    })
  }
  deleteSuperDepartment(id: number): void {
    console.log(id);

      this.http.patch(`${this.baseUrl}/super_department/${id}/archive`,{}).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  deleteSubDepartment(id: number): void {
    console.log(id);

    this.http.patch(`${this.baseUrl}/sub_department/${id}/archive`,{}).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

}
