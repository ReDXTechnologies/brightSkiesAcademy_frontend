import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../core/service/course.service";
import {Course} from "../../../core/models/course";
import {ReviewService} from "../../../core/service/review.service";
import {Teacher} from "../../../core/models/teacher";
import {Review} from "../../../core/models/review";
import {Router} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../core/service/auth.service";

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
  reviews: Review[];
teacher : Teacher;
  role : any

  constructor(private courseService: CourseService,
              private reviewService: ReviewService,
              private teacherService: TeacherService,
              private authService: AuthService,

              private router: Router,
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
    this.courseService.getApprovedCourses().subscribe(
      (data) => {
        console.log(data)
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

}
