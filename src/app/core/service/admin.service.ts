import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from "../../../environments/environment";
import {Teacher} from "../models/teacher";
import {Course} from "../models/course";
import {User} from "../models/user";

@Injectable()
export class AdminService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Teacher[]> = new BehaviorSubject<Teacher[]>([]);
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

  getUser(id: string) {
    return this.httpClient.get<User>(`${this.baseUrl}/user/${id}`);
  }
  getSuperAdminDetails() {
    return this.httpClient.get<User>(`${this.baseUrl}/superuser`);
  }

  updateUser(id: number, user: any) {
    return this.httpClient.put(`${this.baseUrl}/user/${id}`,user);
  }

  launchSession(admin_id: number, courseId: number,lab_id:number): Observable<any> {
    const url = `${this.baseUrl}/testCourseInstance/admin/${admin_id}/course/${courseId}/lab/${lab_id}`;
    return this.httpClient.post<any>(url,{});
  }
  createCustomAmi( courseId: number,lab_id:number): Observable<any> {
    const url = `${this.baseUrl}/course/${courseId}/lab/${lab_id}/create_custom_ami`;
    return this.httpClient.post<any>(url,{});
  }


  updateProfilePicture(userId: number, image: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/update-profile-picture/${userId}`, image);
  }

}
