import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AuthService} from "../../../../core/service/auth.service";
import {TeacherService} from "../../../../core/service/teacher.service";
import {StudentService} from "../../../../core/service/student.service";

@Component({
  selector: 'app-coursevideo',
  templateUrl: './coursevideo.component.html',
  styleUrls: ['./coursevideo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursevideoComponent implements OnInit {
  @Input() course: Course;
  @Input() courseId: number;
  @Input() user: number;
  @Input() teacher_id: number;
  videoUrl: any
  role: any

  @Input() videos: any[];
  @Input() selectedIndex: number;
  requestSent = false
  is_enrolled = false

  constructor(private sanitizer: DomSanitizer,
              private authService: AuthService,
              private teacherService: TeacherService,
              private studentService: StudentService,
  ) {
    this.role = this.authService.currentUserValue.role[0];

  }

  ngOnInit(): void {
    console.log("88888",this.course)
    this.check_enrollement()
    if (this.role === 'Student' || this.role === 'head_super_department' || this.role === 'head_sub_department'||(this.role === 'Student_Teacher' && this.user !== this.teacher_id) || (this.role === 'Teacher' && this.user !== this.teacher_id)) {
      if (!this.course?.free) {
        this.teacherService.checkUserEnrollement(this.user, this.courseId).subscribe(res => {
          if (res === 'true') {
            this.requestSent = true
          }
        })
      }}
  }

  check_enrollement(){
    this.studentService.isEnrolled(this.courseId, this.user).subscribe(res => {
      if (res === 'true') {
        this.is_enrolled = true
      }
    })
  }

  requestEnrollement(user_id: number, course_id: number) {
    this.teacherService.requestCourseEnrollement(user_id, course_id).subscribe(res => {
      console.log("rrrrr",res)
      if(!this.course.free){
        this.requestSent = true

      }else{
        this.is_enrolled = true
      }

    })
  }

}
