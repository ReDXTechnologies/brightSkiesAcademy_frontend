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
    const url = this.course.modules[0].videos[0].video_file.toString()
    const realUrl = url.split('?')[0];
    this.videoUrl = decodeURIComponent(realUrl.replace(/\+/g, " "));
    this.check_enrollement()
    if (this.role === 'Student' ||(this.role === 'Student_Teacher' && this.user !== this.teacher_id) || (this.role === 'Teacher' && this.user !== this.teacher_id)) {
      if (!this.course.free) {
        this.teacherService.checkUserEnrollement(this.user, this.course.id).subscribe(res => {
          if (res === 'true') {
            this.requestSent = true
          }
        })
      }}
  }

  check_enrollement(){
    this.studentService.isEnrolled(this.course.id, this.user).subscribe(res => {
      if (res === 'true') {
        this.is_enrolled = true
      }
    })
  }

  requestEnrollement(user_id: number, course_id: number) {
    this.teacherService.requestCourseEnrollement(user_id, course_id).subscribe(res => {
      console.log(res)
      this.requestSent = true
    })
  }

}
