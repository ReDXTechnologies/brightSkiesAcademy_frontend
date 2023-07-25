import {Component, Injectable, Input, OnInit} from '@angular/core';
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
import {AddContributorsComponent} from "./add/add-contributors/add-contributors.component";
import {DepartmentService} from "../../../../core/service/department.service";
@Injectable()
@Component({
  selector: 'app-about-course',
  templateUrl: './lab-course.component.html',
  styleUrls: ['./lab-course.component.scss'],
})
export class LabCourseComponent implements OnInit {
  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private teacherService: TeacherService,
              private courseService: CourseService,
              private adminService: AdminService,
              private departmentService: DepartmentService,
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
          this.contributorTeachers = this.course.teachers;
          console.log(this.course.what_you_will_learn)
          this.lines = this.course.what_you_will_learn.split(`-`).filter((line) => line.trim().length > 0);
          console.log(this.lines);
        }
      );
    });
  }
  writeReviewActive = false;
  @Input() is_enrolled = false;
  user_id: string;
  isLoading = false;
  course: Course;
  teacher: Teacher;
  reviews: Review[];
  role: any;
  userId: number;
  enrolled = false;
  courseId: any;
  progress: number;
  teachers: Teacher[] = [];
  contributorTeachers: number[] = [];
  lines: string[] = [];

  protected readonly parseInt = parseInt;
  protected readonly Number = Number;

  writeReview() {
    if (this.writeReviewActive == false) {
      this.writeReviewActive = true;
    } else {
      this.writeReviewActive = false;
    }
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id);
    this.checkEnrollement();
    // const courseJson = this.route.snapshot.queryParamMap.get('course');
    const teacherJson = this.route.snapshot.queryParamMap.get('teacher');
    const reviewsJson = this.route.snapshot.queryParamMap.get('reviews');
    if (teacherJson) {
      this.teacher = JSON.parse(teacherJson);
    }
    if (reviewsJson) {
      this.reviews = JSON.parse(reviewsJson);
    }

    this.courseService.getCurrentStep(this.courseId, this.userId).subscribe(current => {
      this.progress = Math.floor(current.progress);
    });
  }
  onEnrollmentChanged(isEnrolled: boolean) {
    // Handle the enrollment change event from the child component
    this.is_enrolled = isEnrolled;
    console.log('Enrollment status changed:', this.is_enrolled);
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

  addContributorCall() {
    this.departmentService.getSubDepartmentsByCourseId(this.courseId).subscribe((dep) => {
      this.teacherService.getFilteredTeachersGrid("", "", dep.name).subscribe((teachers) => {
        teachers.results.map((el1) =>  this.teachers.push(el1));
        const contributorsSet: Set<number> = new Set(this.contributorTeachers);
        console.log(contributorsSet);
        this.teachers = this.teachers.filter((teacherId) =>  !contributorsSet.has(teacherId.user.id));
        console.log(this.teachers);
        const dialogRef = this.dialog.open(AddContributorsComponent, {
          width: '50%',
          data: {
            teachers: this.teachers,
            course: this.course,
            action: 'add',
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.teachers = [];
            });
      });
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
            console.log(res);
            window.location.reload();
          });
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
          this.courseId = params.courseId;
          this.courseService.getCourseById(params.courseId).subscribe(course => {
              this.course = course;
            }
          );

        });
   }
    });
  }
  viewDetails(course: Course) {
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
        teacher : this.teacher.user.id
      }
    });
    });
  }
  checkEnrollement(){
    this.studentService.isEnrolled(this.courseId, this.userId).subscribe(res => {
      console.log("course id :  " + this.courseId + "res : " + res);
      if (res === 'true'){
        this.is_enrolled = true;
      }
    });
  }
}
