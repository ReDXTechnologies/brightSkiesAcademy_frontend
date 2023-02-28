import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Department } from '../models/department';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";

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
  getAllDepartments(): void {
    const url = `${this.baseUrl}/departments`;

    this.subs.sink = this.http.get<Department[]>(url).subscribe(
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

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}${id}/`);
  }

  create(department: { name: string; department_start_date: string; head_of_department: any; email: any }): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/department/create`, department);
  }

  getDialogData() {
    return this.dialogData;
  }
  get data(): Department[] {
    return this.dataChange.value;
  }

  updateDepartment(department: Department,id:string): void {
    this.dialogData = department;
    this.http.put(`${this.baseUrl}/departments/${id}`,department).subscribe(data => {
    })
  }
  deleteDepartment(id: number): void {
    console.log(id);

      this.http.patch(`${this.baseUrl}/department/${id}/archive`,{}).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

}
