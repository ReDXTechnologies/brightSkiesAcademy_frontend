import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {Module, Video} from "../../../../core/models/Module";
import {DisplayCurriculumVideosComponent} from "../displayCurriculumVideos/displayCurriculumVideos.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../../core/service/auth.service";
import {AdminService} from "../../../../core/service/admin.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StudentService} from "../../../../core/service/student.service";
import {map, shareReplay, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {CourseService} from "../../../../core/service/course.service";
import {AddVideoComponent} from "./edit/add-video/add-video.component";
import {AddLabComponent} from "./edit/add-lab/add-lab.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteVideoLabDialogComponent} from "./edit/delete/delete.component";

@Component({
  selector: 'app-coursecurriculam',
  templateUrl: './coursecurriculam.component.html',
  styleUrls: ['./coursecurriculam.component.scss']
})
export class CoursecurriculamComponent implements OnInit {
  @Input() course: Course;
  @Input() courseId: number;

  @Input() teacher_id: number;
  @Input() user: number;
  newName = '';
  @ViewChild('inputElement') inputElementRef: ElementRef;

  currentVideo: Video;
  role: any
  currentVideoIndex: number;
  isLoading = false;
  isLoadingStart = false;
  is_enrolled = false
  constructor(public dialog: MatDialog, private authService: AuthService,
              private adminService: AdminService,
              private spinner: NgxSpinnerService,
              private studentService: StudentService,
              private courseService: CourseService,
              private snackBar: MatSnackBar,

  ) {
    this.role = this.authService.currentUserValue.role[0];
  }

  isEditMode = false;

  editingModuleIndex: number = -1;

  editName(index: number) {
    this.editingModuleIndex = index;

    this.isEditMode = true;
    this.inputElementRef.nativeElement.focus();


  }
  onSpaceKeydown(event: KeyboardEvent) {
    event.stopPropagation();
  }

  updateName(event: KeyboardEvent, index: number) {
    const module = this.course.modules[index];
    const formData = new FormData();
    formData.append('name', this.newName);
    if (event.key === ' ') {
      event.preventDefault();
    }
    if (event.key === 'Enter') {
      this.courseService.updateModuleName(this.courseId, formData, module.id).subscribe(res => {
        module.name = res.name;
        this.isEditMode = false;
        this.editingModuleIndex = -1;
      });
    }
  }

  ngOnInit(): void {
    this.checkEnrollement();

  }
 checkEnrollement(){
    this.studentService.isEnrolled(this.courseId,this.user).subscribe(res=>{
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
  addVideo( courseId: number, moduleId: any, moduleName : string) {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      width: '50%',
      data: {
        courseId: courseId,
        moduleId: moduleId,
        moduleName: moduleName
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'video added Successfully...!!!',
          'center',
          'center'
        );
      }
      window.location.reload()
    });

  }
  deleteVideo( courseId: number, moduleId: any,  videoId: any,moduleName : string ,videoName : string) {
    const dialogRef = this.dialog.open(DeleteVideoLabDialogComponent, {
      width: '20%',
      data: {
        deleteVideo : true,
        courseId: courseId,
        moduleId: moduleId,
        videoId: videoId,
        moduleName: moduleName,
        videoName : videoName
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-danger',
          'video deleted Successfully...!!!',
          'center',
          'center'
        );
      }
      window.location.reload()
    });

  }
  addLab( courseId: number, moduleId: any, moduleName : string) {
    this.dialog.open(AddLabComponent, {
      width: '50%',
      data: {
        courseId: courseId,
        moduleId: moduleId,
        moduleName: moduleName
      }
    });
  }
  startSession(courseId: number,lab_id: number) {
    console.log(lab_id)
    this.isLoadingStart = true;
    this.spinner.show();

    if (this.course.status==='pending') {
      this.adminService.launchSession(this.user, courseId,lab_id).subscribe(response => {
        console.log(response)
        this.isLoadingStart = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    } else {
      this.studentService.launchSession(this.user, courseId,lab_id).subscribe(response => {
        console.log(response)

        this.isLoadingStart = false;
        this.spinner.hide();
        window.open(response.instance_url, '_blank');
      });
    }


  }
  createCustomAmi(courseId: number,lab_id: number) {
    this.isLoading = true;
    this.spinner.show();

      this.adminService.createCustomAmi(courseId,lab_id).subscribe(response => {
        console.log(response)
        this.isLoading = false;
        this.spinner.hide();
      });
  }

  sessionsRemainingMap = new Map<string, Observable<string>>();

  sessionsRemaining(courseId: number, labId: number): Observable<string> {
    const key = `${this.user}-${courseId}-${labId}`;

    if (this.sessionsRemainingMap.has(key)) {
      return this.sessionsRemainingMap.get(key);
    }

    const remainingTrials$ = this.studentService.remainingSessions(this.user, courseId, labId).pipe(
      map(res => `Active sessions: <strong>${res.active_count}</strong>, Expired sessions: ${res.expired_count}, Remaining trials: ${res.available_count}`),
      shareReplay(1)
    );
    console.log(remainingTrials$)
    this.sessionsRemainingMap.set(key, remainingTrials$);

    remainingTrials$.subscribe();
    console.log(remainingTrials$)

    return remainingTrials$;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }





}
