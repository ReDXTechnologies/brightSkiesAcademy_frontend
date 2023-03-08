import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../../core/service/student.service";
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from "@angular/router";
import {Teacher} from "../../../../core/models/teacher";
import {TeacherService} from "../../../../core/service/teacher.service";
import {Review} from "../../../../core/models/review";
import {AuthService} from "../../../../core/service/auth.service";
import {AdminService} from "../../../../core/service/admin.service";

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
  course: any;
  teacher: Teacher;
  reviews: Review[];
  role: any
  enrolled = false;
userId : number;
  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private teacherService: TeacherService,
              private adminService: AdminService,
              private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.role = this.authService.currentUserValue.role[0];
    console.log(this.role)
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    const courseJson = this.route.snapshot.queryParamMap.get('course');
    const teacherJson = this.route.snapshot.queryParamMap.get('teacher');
    const reviewsJson = this.route.snapshot.queryParamMap.get('reviews');

    if (courseJson) {
      this.course = JSON.parse(courseJson);
    }

    if (teacherJson) {
      this.teacher = JSON.parse(teacherJson);
      console.log("************************************",typeof this.teacher.user.id ,typeof this.user_id )
    }
    if (reviewsJson) {
      this.reviews = JSON.parse(reviewsJson);
    }
    this.checkEnrollment(this.course.id, this.user_id);


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

  checkEnrollment(courseId: number, studentId: string) {
    this.studentService.isEnrolled(courseId, studentId)
      .subscribe(response => this.enrolled = response.enrolled);
  }

  startSession(courseId: number) {
    this.isLoading = true;
    this.spinner.show();

    if (this.role === 'Super_Admin') {
      this.adminService.launchSession(this.user_id, courseId).subscribe(response => {
        this.isLoading = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    } else {
      this.studentService.launchSession(this.user_id, courseId).subscribe(response => {
        this.isLoading = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    }


  }
}
