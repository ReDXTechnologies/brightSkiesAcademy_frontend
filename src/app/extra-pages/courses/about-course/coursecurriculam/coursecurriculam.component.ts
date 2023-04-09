import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {Module, Video} from "../../../../core/models/Module";
import {DisplayCurriculumVideosComponent} from "../displayCurriculumVideos/displayCurriculumVideos.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../../core/service/auth.service";
import {AdminService} from "../../../../core/service/admin.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StudentService} from "../../../../core/service/student.service";

@Component({
  selector: 'app-coursecurriculam',
  templateUrl: './coursecurriculam.component.html',
  styleUrls: ['./coursecurriculam.component.scss']
})
export class CoursecurriculamComponent implements OnInit {
  @Input() course: Course;
  @Input() teacher_id: number;
  @Input() user: number;

  modules: Module[]
  currentVideo: Video;
  role: any
  currentVideoIndex: number;
  isLoading = false;
  is_enrolled = false
  constructor(public dialog: MatDialog, private authService: AuthService, private adminService: AdminService,
              private spinner: NgxSpinnerService,private studentService: StudentService,
  ) {
    this.role = this.authService.currentUserValue.role[0];
  }

  ngOnInit(): void {

    console.log(this.course.slides)
    this.modules = this.course.modules;
    this.checkEnrollement();

  }
 checkEnrollement(){
    this.studentService.isEnrolled(this.course.id,this.user).subscribe(res=>{
      if(res ==='true'){
        this.is_enrolled = true
      }
    })
 }

  displayVideo(video: Video, index: number, module: any) {
    this.currentVideo = video;
    this.currentVideoIndex = index;
    this.dialog.open(DisplayCurriculumVideosComponent, {
      width: '70%',
      data: {
        videoUrl: video.video_file,
        videos: module.videos,
        currentIndex: index,
        module: module
      }
    });
  }
  startSession(courseId: number) {
    this.isLoading = true;
    this.spinner.show();

    if (this.role === 'Super_Admin') {
      this.adminService.launchSession(this.user, courseId).subscribe(response => {
        this.isLoading = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    } else {
      this.studentService.launchSession(this.user, courseId).subscribe(response => {
        this.isLoading = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    }


  }
}
