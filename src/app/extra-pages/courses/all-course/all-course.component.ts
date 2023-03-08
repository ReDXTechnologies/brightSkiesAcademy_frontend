import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/service/course.service";
import {Course} from "../../../core/models/course";
import {ReviewService} from "../../../core/service/review.service";
import {Teacher} from "../../../core/models/teacher";
import {Review} from "../../../core/models/review";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../core/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.sass'],
})
export class AllCourseComponent implements OnInit {
  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];
  courses: Course[];
  teacherApprovedCourses: Course[];
  teacherPendingCourses: Course[];
  reviews: Review[];
  teacher: Teacher;
  role: any
  selectedIndex = 0;

  constructor(private courseService: CourseService,
              private reviewService: ReviewService,
              private teacherService: TeacherService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.role = this.authService.currentUserValue.role[0];

  }

  getTeacherDetails(teacherIds: any): Observable<any[]> {
    const teachers = [];

    teacherIds.forEach(id => {
      this.teacherService.getTeacherById(id).subscribe(
        (data) => {
          teachers.push(data);
        },
        (error) => {
          console.log(`Error fetching teacher details for teacher ID ${id}:`, error);
        }
      );
    });

    return of(teachers);
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'my_available_courses') {
        this.selectedIndex = 1;
      }else if  (fragment === 'my_pending_courses') {
        this.selectedIndex = 2;
      }
      else if  (fragment === 'lab_courses') {
        this.selectedIndex = 3;
      }else if  (fragment === 'tutorial_courses') {
        this.selectedIndex = 4;
      }
      else {
        this.selectedIndex = 0; // Set the index of the default tab
        this.selectedIndex = 0; // Set the index of the default tab
      }
    });
    if (this.role === 'Teacher') {
      this.getAllApprovedCourses(localStorage.getItem("id"));
      this.getAllPendingCourses(localStorage.getItem('id'))
      this.getAllTeacherApprovedCourses(localStorage.getItem('id'))
    } else {
      this.getAllApprovedCourses(localStorage.getItem("id"));
    }

  }

  getAllApprovedCourses(item: string) {
    this.courseService.getApprovedCourses().subscribe(
      (data) => {
        this.courses = data;
        this.courses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }

  getAllTeacherApprovedCourses(teacherId: string) {
    this.teacherService.getApprovedCourses(teacherId).subscribe(
      (data) => {
        console.log(data)
        this.teacherApprovedCourses = data;
        this.teacherApprovedCourses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }

  getAllPendingCourses(teacherId: string) {
    this.teacherService.getPendingCourses(teacherId).subscribe(
      (data) => {
        console.log(data)
        this.teacherPendingCourses = data;
        this.teacherPendingCourses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }

  viewDetails(course: Course) {
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
                course: courseJson,
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

  editCourse(course: Course) {
    this.router.navigate(['/shared/add-course'], { queryParams: { edit: true, courseId: course.id } });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  navigateToCoursesTab(tabId: string) {
    this.router.navigateByUrl('/shared/courses#'+tabId);
  }

  deletePendingCourse(course: Course) {
    this.courseService.delete(course.id).subscribe(res=>{
      console.log(res);
      this.getAllTeacherApprovedCourses(localStorage.getItem('id'));
      this.showNotification(
        'snackbar-danger',
        'course deleted Successfully...!!!',
        'center',
        'center'
      );
      this.navigateToCoursesTab('2');

    })

  }
  deleteApprovedCourse(course: Course) {
    this.courseService.delete(course.id).subscribe(res=>{
      console.log(res);
      this.getAllTeacherApprovedCourses(localStorage.getItem('id'));
      this.showNotification(
        'snackbar-danger',
        'course deleted Successfully...!!!',
        'center',
        'center'
      );
      this.navigateToCoursesTab('1');

    })

  }
}
