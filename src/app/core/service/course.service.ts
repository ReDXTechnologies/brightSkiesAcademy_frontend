import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Course } from '../models/course';
import { Review } from '../models/review';
import {environment} from "../../../environments/environment";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../models/teacher";
import {Lab, Module, Quizz, Video} from "../models/Module";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): any {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // getPendingCourses(): Observable<any> {
  //   const url = `${this.baseUrl}/pending-courses`;
  //
  //   return this.http.get<any>(url);
  // }
  getPendingCourses(): Observable<any> {
    const url = `${this.baseUrl}/pending-courses`;
   return this.httpClient.get<any>(url);
  }
  getPendingUpdatedCourses(): Observable<any> {
    const url = `${this.baseUrl}/pending-updated-courses`;
    return this.httpClient.get<any>(url);
  }
  getPendingUpdatedCoursesPerPage(page: number): Observable<any> {
    const url = `${this.baseUrl}/pending-updated-courses?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }
  getPendingCoursesPerPage(page: number): Observable<any> {
    const url = `${this.baseUrl}/pending-courses?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }




  getSuperDepPendingCoursesPerPage(dep_id: any,page: number): Observable<any> {
    const url = `${this.baseUrl}/superdepartments/${dep_id}/courses/pending?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });  }
  getSubDepPendingCoursesPerPage(dep_id : any,page: number): Observable<any> {
    const url = `${this.baseUrl}/subdepartments/${dep_id}/courses/pending?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });  }

  getSuperDepUpdatedPendingCoursesPerPage(dep_id: any,page: number): Observable<any> {
    const url = `${this.baseUrl}/superdepartments/${dep_id}/updated-courses/pending?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });  }
  getSubDepUpdatedPendingCoursesPerPage(dep_id : any,page: number): Observable<any> {
    const url = `${this.baseUrl}/subdepartments/${dep_id}/updated-courses/pending?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }










  getSuperDepPendingCourses(dep_id: any): Observable<any> {
    const url = `${this.baseUrl}/superdepartments/${dep_id}/courses/pending`;
    return this.httpClient.get<any>(url);
  }
  getSubDepPendingCourses(dep_id : any): Observable<any> {
    const url = `${this.baseUrl}/subdepartments/${dep_id}/courses/pending`;
    return this.httpClient.get<any>(url);
  }

  getSuperDepUpdatedPendingCourses(dep_id: any): Observable<any> {
    const url = `${this.baseUrl}/superdepartments/${dep_id}/updated-courses/pending`;
    return this.httpClient.get<any>(url);
  }
  getSubDepUpdatedPendingCourses(dep_id : any): Observable<any> {
    const url = `${this.baseUrl}/subdepartments/${dep_id}/updated-courses/pending`;
    return this.httpClient.get<any>(url);
  }


  getApprovedCoursesPerPage(page: number): Observable<any> {
    const url = `${this.baseUrl}/approved-courses?page=${page}`;
    let params = new HttpParams();
    params = params.set('page',page);
    return this.httpClient.get<any>(url, { params });
  }
  getApprovedCourses(): Observable<any> {
    const url = `${this.baseUrl}/approved-courses`;

    return this.httpClient.get<any>(url);
  }

  approveCourse(course_id:number): Observable<Course> {
    const url = `${this.baseUrl}/course/${course_id}/approve`;

    return this.httpClient.post<Course>(url,{});
  }
  createCustomAMI(course_id:number): Observable<Course> {
    const url = `${this.baseUrl}/course/${course_id}/create_custom_ami`;

    return this.httpClient.post<Course>(url,{});
  }

  rejectCourse(course_id:number,emailText:string){
    const url = `${this.baseUrl}/courses/${course_id}/reject`;
    console.log(url)
    return this.httpClient.post(url,emailText);
  }
  getCourseById(course_id:number): Observable<Course>{
    const url = `${this.baseUrl}/courses/${course_id}`;
    return this.httpClient.get<Course>(url);
  }
  getCurrentStep(course_id: number, student_id: number): Observable<any>{
    const url = `${this.baseUrl}/user-progress/${student_id}/${course_id}`;
    return this.httpClient.get<any>(url);
  }
  updateCurrentStep(courseId: number, formData : any, student_id: number) : Observable<any> {
    const url = `${this.baseUrl}/course/${courseId}/student/${student_id}/currentStep`;
    return this.httpClient.put<any>(url, formData);
  }
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/${id}`);
  }

  createCourse(teacherId: string, formData: FormData, free: boolean, certified: boolean) : Observable<Course> {
    const url = `${this.baseUrl}/course/create/${teacherId}?free=${free}&certificate=${certified}`;
    return this.httpClient.post<Course>(url, formData);
  }

  updateCourse(courseId: number,formData: FormData, free: boolean, certified: boolean) : Observable<Course> {
    const url = `${this.baseUrl}/course/${courseId}/update?free=${free}&certificate=${certified}`;
    return this.httpClient.put<Course>(url, formData);
  }
  addModule(courseId: number, formData : any) : Observable<Module> {
    const url = `${this.baseUrl}/course/${courseId}/add_module`;
    return this.httpClient.post<Module>(url, formData);
  }
  updateModuleName(courseId: number, formData : any,moduleId:number) : Observable<Module> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}`;
    return this.httpClient.put<Module>(url, formData);
  }
  deleteModule(courseId: number,moduleId:number) {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/deleteModule`;
    return this.httpClient.delete(url);
  }
  getVideoInModule(courseId: number, moduleId:number) : Observable<Video[]> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/videos`;
    return this.httpClient.get<Video[]>(url);
  }
  addVideoInModule(courseId: number, formData : any,moduleId:number) : Observable<Video> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/add_video`;
    return this.httpClient.post<Video>(url, formData);
  }
  editVideoInModule(courseId: number, formData : any,moduleId:number,videoId:number) : Observable<Video> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/updateVideo/${videoId}`;
    return this.httpClient.put<Video>(url, formData);
  }
  deleteVideoInModule(courseId: number,moduleId:number,videoId:number) {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/deleteVideo/${videoId}`;
    return this.httpClient.delete(url);
  }
  addLabInModule(courseId: number, formData : any,moduleId:number) : Observable<Lab> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/add_lab`;
    return this.httpClient.post<Lab>(url, formData);
  }
  editLabInModule(courseId: number, formData : any,moduleId:number,labId:number) : Observable<Lab> {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/updateLab/${labId}`;
    return this.httpClient.put<Lab>(url, formData);
  }
  deleteLabInModule(courseId: number,moduleId:number,labId:number) {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/deleteLab/${labId}`;
    return this.httpClient.delete(url);
  }

  // quizz cruds
  addQuizzInModule( quizz : any,moduleId:number) : Observable<Quizz> {
    const url = `${this.baseUrl}/module/${moduleId}/quizz/create`;
    return this.httpClient.post<Quizz>(url, quizz);
  }
  getQuizzInModule( moduleId:number) : Observable<Quizz> {
    const url = `${this.baseUrl}/module/${moduleId}/quizz`;
    return this.httpClient.get<Quizz>(url);
  }
  editQuizzInModule( quizz : any,moduleId:number,QuizzId:number) : Observable<Quizz> {
    const url = `${this.baseUrl}/module/${moduleId}/quizz/${QuizzId}/update`;
    return this.httpClient.put<Quizz>(url, quizz);
  }
  deleteQuizzInModule( moduleId:number,QuizzId:number)  {
    const url = `${this.baseUrl}/module/${moduleId}/quizz/${QuizzId}/delete`;
    return this.httpClient.delete(url);
  }
  deleteQuestionInQuizzInModule( moduleId:number,QuizzId:number,QuestionId:number)  {
    const url = `${this.baseUrl}/quizz/${QuizzId}/delete_question/${QuestionId}`;
    return this.httpClient.delete(url);
  }
  deleteOptionInQuestionInQuizzInModule(QuizzId:number,QuestionId:number,OptionId:number)  {
    const url = `${this.baseUrl}/quizz/${QuizzId}/question/${QuestionId}/delete_option/${OptionId}`;
    return this.httpClient.delete(url);
  }

  addScoreInModule( courseId:number,quizzId : number,moduleId:number,userId:number,score:any) {
    const url = `${this.baseUrl}/course/${courseId}/module/${moduleId}/quizz/${quizzId}/user/${userId}/save-score`;
    return this.httpClient.post(url, score);
  }
  getScoreInModule( userId:number,quizzId:number)  {
    const url = `${this.baseUrl}/user/${userId}/quizz/${quizzId}/score`;
    return this.httpClient.get(url);
  }


  getFilteredCourses(sub_department: string[], level: string, workload_range: string, title_regex: string, is_free: string): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/courses?sub_department=${sub_department}&level=${level}&workload_range=${workload_range}&title_regex=${title_regex}&is_free=${is_free}`;

    if (sub_department.length > 0) {
      params = params.set('sub_department', sub_department.join(','));
    }
    if (level) {
      params = params.set('level', level);
    }
    if (workload_range) {
      params = params.set('workload_range',workload_range);
    }
    if (title_regex) {
      params = params.set('title_regex',title_regex);
    }
    if (is_free) {
      params = params.set('is_free',is_free);
    }
    return this.httpClient.get<any>(url, { params });
  }
  getFilteredPendingCourses(sub_department: string[]): Observable<any> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/courses/pending_filter?sub_department=${sub_department}`;

    if (sub_department.length > 0) {
      params = params.set('sub_department', sub_department.join(','));
    }
    return this.httpClient.get<any>(url, { params });
  }

  getSuperDepartmentPremuinCourseEnrollementRequests(superDepartmentId: any):void  {
    const url = `${this.baseUrl}/super_department/${superDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
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
  getSubDepartmentPremuinCourseEnrollementRequests(subDepartmentId: any):void  {
    const url = `${this.baseUrl}/sub_department/${subDepartmentId}/hybridProfilesRequests`;
    this.subs.sink = this.httpClient.get<any>(url).subscribe(
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
}
