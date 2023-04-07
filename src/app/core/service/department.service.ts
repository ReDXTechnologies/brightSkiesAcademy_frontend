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
  getNewlyCreatedHeadsOfSuperDepartments(): Observable<User[]> {
    const url = `${this.baseUrl}/super-department-heads/newly_created`;

    return this.http.get<User[]>(url);
  }
  getHeadsOfSubDepartments(): Observable<User[]> {
    const url = `${this.baseUrl}/sub-department-heads`;

    return this.http.get<User[]>(url);
  }
  getNewlyCreatedHeadsOfSubDepartments(): Observable<User[]> {
    const url = `${this.baseUrl}/sub-department-heads/newly_created`;

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

  getSuperDepByUserId(user_id: any):Observable<Department[]> {
    const url = `${this.baseUrl}/user/${user_id}/super_department`;

    return this.http.get<Department[]>(url);
  }
  getSubDepByUserId(user_id: any):Observable<Department[]> {
    const url = `${this.baseUrl}/user/${user_id}/sub_department`;

    return this.http.get<Department[]>(url);
  }
  getSubDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}/sub-departments`;

    return this.http.get<Department[]>(url);
  }
  getSubDepartmentById(dep_id : any): Observable<Department> {
    const url = `${this.baseUrl}/subdepartment/${dep_id}`;

    return this.http.get<Department>(url);
  }
  getSubDepartmentsBySuperDepId(dep_id : any): Observable<Department[]> {
    const url = `${this.baseUrl}/super-departments/${dep_id}/sub-departments`;

    return this.http.get<Department[]>(url);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}${id}/`);
  }

  createSuperDepartment(department: { name: string; department_start_date: string;  email: any;  }, head_id: string): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/super-departments/create/${head_id}`, department);
  }
  createSubDepartment(department: any, head_id: string, super_dep_id :string): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/sub-departments/create/${head_id}/super_dep/${super_dep_id}`, department);
  }


  getDialogData() {
    return this.dialogData;
  }
  get data(): Department[] {
    return this.dataChange.value;
  }

  updateSuperDepartment(department: any, id: string , headId: string): Observable<Department> {
    this.dialogData = department;
    return this.http.put<Department>(`${this.baseUrl}/super_department/${id}/head/${headId}`,department);
  }
  updateSubDepartment(department:any, id: string,headId: string):  Observable<any>{
    this.dialogData = department;
    return this.http.put<any>(`${this.baseUrl}/sub_department/${id}/head/${headId}`,department)
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
