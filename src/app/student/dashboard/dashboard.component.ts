import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {
  ChartComponent,
} from 'ng-apexcharts';
import {Course} from "../../core/models/course";
import {CourseService} from "../../core/service/course.service";
import {TeacherService} from "../../core/service/teacher.service";
import {Subscription} from "rxjs";
import {StudentService} from "../../core/service/student.service";
import {Teacher} from "../../core/models/teacher";
import {ReviewService} from "../../core/service/review.service";
import {Review} from "../../core/models/review";
import {ActivatedRoute, Router} from "@angular/router";
import { ProgressBarMode } from '@angular/material/progress-bar';
import {ThemePalette} from "@angular/material/core";
import {AuthService} from "../../core/service/auth.service";


function transformDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear() % 100;

  const transformedDate = `${day} ${month} '${year}`;

  return transformedDate;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent;
  role: any;
  courses: Course[];
  pendingCourses: Course[] = [];
  teacherApprovedCourses: Course[];
  reviews: Review[];
  academyCourseProgress = [];
  currentPage = 1;
  totalPages = 0;
  returnedItems = 6;
  image: any;
  course: Course;
  RecomCourses: any;
  userId: number;
  user_id: string;
  teacher: Teacher;
  progress = 0;
  name: string;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendPosition = 'right';
  timeline = true;
  endDate: Date;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  // vaericle bar chart start
  vbarxAxisLabel = 'Days';
  vbaryAxisLabel = 'Courses';
  showLabels = true;
  public single = [];
  chartDataSubscription: Subscription;
  RecommandedCourses = [];
  constructor(private courseService: CourseService,
              private studentService: StudentService,
              private reviewService: ReviewService,
              private router: Router,
              private route: ActivatedRoute,
              private teacherService: TeacherService,
              private authService: AuthService) {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id);
    this.role = this.authService.currentUserValue.role[0];
    if (this.role === 'Teacher' || this.role === 'Student_Teacher'){
      this.getTeacherDetails(this.user_id);
      this.teacherService.getPendingCourses(this.user_id).subscribe((res) => {
        this.pendingCourses = res.results;
      });
      this.teacherService.getTeacherApprovedCourses(this.user_id, 1).subscribe(
        (data) => {
          this.teacherApprovedCourses = data.results;
          this.totalPages = Math.ceil(data.count / 6);
        },
        (error) => {
          console.log('Error getting approved courses:', error);
        });
    }
  }
  // Doughnut chart end

  ngOnInit() {
    this.courseService.getCourseSteps(this.userId).subscribe((id) => {
      if ( id.filter((el1) => el1.progress < 100 && el1.progress > 0).length !== 0) {
        const course1 = id.filter((el1) => el1.progress < 100).sort((a, b) => b.progress - a.progress)[0];
        this.progress = Math.floor(course1.progress);
        this.course = course1.course;
        this.studentService.getStudent(this.user_id).subscribe((student) => {
          this.name = student.user.firstName;
        });
      }
    });
    this.getStudentCourses(localStorage.getItem('id'),1);
    if (this.role === 'Student') {
      this.chartDataSubscription = this.courseService.getCourseSteps(this.userId).subscribe((el1) => {
        el1.forEach((el2) => {
          const startDate = new Date(el2.time);
          if (el2.endTimeCourse === '1900-01-01') {
            this.endDate = new Date(Date.now());
          } else {
            this.endDate = new Date(el2.endTimeCourse);
          }
          const timeDifference = this.endDate.getTime() - startDate.getTime();
          this.single.push({
            name: el2.course.title,
            value: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
          });
        });
      });
    }
    this.courseService.getRecommandedCourses(this.userId).subscribe((course) => {
      this.RecomCourses = course;
      this.RecomCourses.map((el2) => el2.creation_date = transformDate(el2.creation_date));
      this.RecomCourses.map((el1) => this.RecommandedCourses.push(el1));
    });
    console.log(this.RecommandedCourses);
    const teacherJson = this.route.snapshot.queryParamMap.get('teacher');
    if (teacherJson) {
      this.teacher = JSON.parse(teacherJson);
    }
  }
  ngOnDestroy() {
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
    }
  }
  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
      console.log(this.currentPage);
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      console.log(this.currentPage);
    }
    this.teacherService.getTeacherApprovedCourses(this.user_id, this.currentPage).subscribe(
      (data) => {
        this.teacherApprovedCourses = data.results;
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      });
  }
  onPageChanged(page: number) {
    this.currentPage = page;
    this.teacherService.getTeacherApprovedCourses(this.user_id, this.currentPage).subscribe(
      (data) => {
        this.teacherApprovedCourses = data.results;
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      });
  }
  public getTeacherDetails(userId: string): void {
    this.teacherService.getTeacherById(userId).subscribe(res => {
      this.teacher = res;
      console.log(this.teacher)
    });
  }
  getStudentCourses(studentId: string, page:number) {
    this.studentService.getStudentCourses(studentId, page).subscribe(res => {
      this.courses = res.results;
      res.results.map((course) => this.courseService.getCurrentStep(course.id, Number(studentId)).subscribe(current1 => {
        const progress = Math.floor(current1.progress);
        this.academyCourseProgress.push({...course, progress});
      }));
      this.totalPages = Math.ceil(res.count/4);

    });
  }
  getProgressBarMode(progress: number): ProgressBarMode {
    return progress === 0 ? 'indeterminate' : 'determinate';
  }
  getProgressBarColor(progress: number): ThemePalette {
    if (progress === 0) {
      return 'accent';
    } else if (progress < 30) {
      return 'warn';
    } else if (progress >= 30 && progress <= 80) {
      return 'accent';
    } else {
      return 'primary';
    }
  }
  viewDetails(course: Course) {
    const teacher_id = course.teachers[0];
    this.courseService.getCurrentStep(course.id, this.userId).subscribe(current => {
      if (current.current_step === 0) {
        const formData = new FormData();
        formData.append('current_step', `1`);
        this.courseService.updateCurrentStep(course.id, formData, this.userId).subscribe();
      }
      const courseJson = JSON.stringify(course);
      this.router.navigate(['/shared/Lab-course-academy'], {
        queryParams: {
          courseId: course.id,
          user : this.userId,
          teacher : teacher_id
        }
      });
    });
  }
  viewDetails1(course: Course) {
    const teacher_id = course.teachers[0];
    this.teacherService.getTeacherById(teacher_id).subscribe(
      (teacher: Teacher) => {
        this.teacher = teacher;
        const teacherJson = JSON.stringify(this.teacher);
        this.reviewService.getCourseReviews(course.id).subscribe(
          (res) => {
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
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
