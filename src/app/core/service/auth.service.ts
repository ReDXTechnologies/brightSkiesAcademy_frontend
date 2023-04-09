import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('jwt_token', user.access);
          localStorage.setItem('id', user.id);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  public signup(email: string, password: string,firstName:string, lastName:string,mobile_phone:string, gender:string,user_type:string) {
    return this.http.post<any>(`${environment.apiUrl}/register?user_type=${user_type}`, {email, password, firstName, lastName,mobile_phone,gender})
      .pipe(
        map((res)=>{
          return res;
        })
      );
  }
  public changePassword(userId: string, email: string, password: string, new_password: string) {
    return this.http.post(`${environment.apiUrl}/user/${userId}/change-password`, {email, password, new_password})

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
