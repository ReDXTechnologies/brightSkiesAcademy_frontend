import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  getById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}${id}/`);
  }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }

  update(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}${id}/`, review);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
