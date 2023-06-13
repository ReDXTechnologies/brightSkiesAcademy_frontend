import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../../core/service/student.service";
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from "@angular/router";
import {Teacher} from "../../../../core/models/teacher";
import {TeacherService} from "../../../../core/service/teacher.service";
import {Review} from "../../../../core/models/review";
import {AuthService} from "../../../../core/service/auth.service";
import {AdminService} from "../../../../core/service/admin.service";
import {FormDialogComponent} from "../../../../admin/teachers/all-teachers/dialogs/form-dialog/form-dialog.component";
import {CourseService} from "../../../../core/service/course.service";
import {MatDialog} from "@angular/material/dialog";
import {EditCourseModuleComponent} from "./edit/edit-course-overview/form-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Course} from "../../../../core/models/course";
import {AddNewModule} from "./edit/add-new-module/add-new-module.component";

@Component({
  selector: 'app-about-course',
  templateUrl: './lab-course.component.html',
  styleUrls: ['./lab-course.component.scss'],
})
export class LabCourseComponent implements OnInit {
  writeReviewActive: boolean = false;

  writeReview() {
    if (this.writeReviewActive == false) {
      this.writeReviewActive = true;
    } else {
      this.writeReviewActive = false;
    }
  }

  user_id: string;
  isLoading = false;
  course: Course;
  teacher: Teacher;
  reviews: Review[];
  role: any;
  userId: number;
  enrolled = false;
  courseId : any;
  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private teacherService: TeacherService,
              private courseService: CourseService,
              private adminService: AdminService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
  ) {
    this.role = this.authService.currentUserValue.role[0];
    console.log(this.role);
    this.activatedRoute.queryParams.subscribe(params => {
      this.courseId = params.courseId;
      this.courseService.getCourseById(params.courseId).subscribe(course => {
          this.course = course;
        }
      );
    });
  }

  ngOnInit(): void {
    console.log('courseId',this.courseId)
    console.log('course',this.course)
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)

    // const courseJson = this.route.snapshot.queryParamMap.get('course');
    const teacherJson = this.route.snapshot.queryParamMap.get('teacher');
    const reviewsJson = this.route.snapshot.queryParamMap.get('reviews');

    if (teacherJson) {
      this.teacher = JSON.parse(teacherJson);
    }
    if (reviewsJson) {
      this.reviews = JSON.parse(reviewsJson);
    }
    console.log(this.course)
  }

  enrollInCourse(courseId: number) {
    this.isLoading = true;
    this.spinner.show();
    this.studentService.enrollStudent(courseId, this.user_id)
      .subscribe(response => {
          this.isLoading = false;
          this.spinner.hide();
          this.enrolled = true;
        }
      )
    ;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  editCall() {

    const dialogRef = this.dialog.open(EditCourseModuleComponent, {
      width: '70%',
      data: {
        course: this.course,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.updateCourse(this.course.id, result.formData, this.course.free, this.course.certificate)
          .subscribe((res) => {
            console.log(res)
            window.location.reload()
          })
      }
    });
  }

  addModule() {

    const dialogRef = this.dialog.open(AddNewModule, {
      width: '70%',
      data: {
        course: this.course,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'module added Successfully...!!!',
          'center',
          'center'
        );
        this.activatedRoute.queryParams.subscribe(params => {
          this.courseId = params.courseId
          this.courseService.getCourseById(params.courseId).subscribe(course => {
              this.course = course
            }
          )

        })
   }
    });
  }
  viewDetails(course: Course) {
    const courseJson = JSON.stringify(course);
    this.router.navigate(['/shared/Lab-course-academy'], {
      queryParams: {
        courseId: course.id,
      }
    });
  }
}
