import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../../core/models/course';
import { Teacher } from '../../../core/models/teacher';
import { CourseService } from '../../../core/service/course.service';
import { ReviewService } from '../../../core/service/review.service';
import { TeacherService } from '../../../core/service/teacher.service';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../../../core/service/department.service';
import { Review } from '../../../core/models/review';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-roadmap-display',
  templateUrl: './roadmap-display.component.html',
  styleUrls: ['./roadmap-display.component.scss']
})
export class RoadmapDisplayComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  roadmapTitle: string;
  coursesData: any;
  teacherApprovedCourses: Course[];
  teacherPendingCourses: Course[];
  reviews: Review[];
  teacher: Teacher;
  role: any
  selectedIndex = 0;
  departments: Department[];
  shopCatActive: boolean = false;
  shopDurationActive: boolean = false;
  shopLevelActive: boolean = false;
  selectedSubDepartments: string[] = [];
  level = '';
  price = '';
  workload = '';
  searchInput = ''
  userId: number;
  user_id: string;
  pages = [];
  currentPage = 1;
  totalPages = 0;
  returnedItems = 9;

  private subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private reviewService: ReviewService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.role = this.authService.currentUserValue.role[0];
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.coursesId) {
        const courseIdsArray = JSON.parse(params.coursesId);
        this.roadmapTitle = params.title;

        const courseObservables = courseIdsArray.map(id => this.courseService.getCourseById(id));

        this.subscriptions.push(
          combineLatest(courseObservables).subscribe(
            (courseArray: Course[]) => {
              this.courses = courseArray;
              this.getRoadMapCourses();
              this.getDepatments();
            },
            (error) => {
              console.error('Error fetching courses:', error);
            }
          )
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getRoadMapCourses() {
    this.courses.forEach(course => {
      this.getTeacherDetails(course.teachers).subscribe(
        (teachers) => {
          course.teacherDetails = teachers;
        }
      );
    });
  }

  private getTeacherDetails(teacherIds: any): Observable<any> {
    const teacherObservables = teacherIds.map(id => this.teacherService.getTeacherById(id));

    return combineLatest(teacherObservables);
  }

  private getDepatments() {
    this.subscriptions.push(
      this.departmentService.getSubDepartments().subscribe(value => {
        if (!!value) {
          this.departments = value;
        }
      })
    );
  }

  viewDetails(course: Course) {
    const teacher_id = course.teachers[0];

    this.subscriptions.push(
      this.teacherService.getTeacherById(teacher_id).subscribe(
        (teacher: Teacher) => {
          this.teacher = teacher;
          const teacherJson = JSON.stringify(this.teacher);

          this.subscriptions.push(
            this.reviewService.getCourseReviews(course.id).subscribe(
              (res: Review[]) => {
                this.reviews = res;
                const reviewJson = JSON.stringify(this.reviews);
                const courseJson = JSON.stringify(course);
                this.router.navigate(['/shared/Lab-course-details'], {
                  queryParams: {
                    courseId: course.id,
                    reviews: reviewJson,
                    teacher: teacherJson
                  }
                });
              },
              (error) => {
                console.error(error);
              }
            )
          );
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }
}
