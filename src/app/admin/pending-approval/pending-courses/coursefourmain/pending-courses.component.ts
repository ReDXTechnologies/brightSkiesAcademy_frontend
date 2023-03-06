import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../../core/service/course.service";
import {Course} from "../../../../core/models/course";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from '@angular/router';
import {Teacher} from "../../../../core/models/teacher";
import {TeacherService} from "../../../../core/service/teacher.service";
import {ReviewService} from "../../../../core/service/review.service";

@Component({
  selector: 'app-coursefourmain',
  templateUrl: './pending-courses.component.html',
  styleUrls: ['./pending-courses.component.scss']
})
export class PendingCoursesComponent implements OnInit {
  courses: Course[];
  teacher: Teacher;

  constructor(public courseService: CourseService,
              private teacherService: TeacherService,
              private router: Router, private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getAllPendingCourses();
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getAllPendingCourses() {
    this.courseService.getPendingCourses().subscribe(
      (data) => {
        console.log(data)
        this.courses = data;
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );

  }

  viewDetails(course: Course) {
    const courseJson = JSON.stringify(course);
    const teacher_id = course.teachers[0]
    this.teacherService.getTeacherById(teacher_id).subscribe(
      (teacher: Teacher) => {
        console.log('aaaaaaaaa',teacher)
        this.teacher = teacher;
        const teacherJson = JSON.stringify(teacher);

        this.router.navigate(['/shared/Lab-course-details'],
          { queryParams: { course: courseJson, teacher: teacherJson } });

      },
      (error) => {
        console.error(error);
      }
    );
  }

  approve(courseId: number) {
    this.courseService.approveCourse(courseId)
      .subscribe((course) => {
        console.log(`Course ${courseId} has been approved.`);
        // do something with the updated course data
        this.getAllPendingCourses();
        this.showNotification(
          'snackbar-success',
          'course approved Successfully...!!!',
          'center',
          'center'
        );

      });
  }

  reject(courseId: number) {
    this.courseService.rejectCourse(courseId)
      .subscribe(() => {
        console.log(`Course ${courseId} has been rejected.`);
        this.getAllPendingCourses();
        this.showNotification(
          'snackbar-danger',
          'course rejected Successfully...!!!',
          'center',
          'center'
        );
        // do something after the course has been rejected
      });
  }

}
