import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {Lab, Module, Video} from "../../../../core/models/Module";
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
import {AddQuizzComponent} from "./edit/add-quizz/add-quizz.component";
import {StartQuizzComponent} from "./start-quizz/start-quizz.component";

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
  percentage: any;
  contributorTeachers: number[] = [];

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

  deleteModule( courseId: number, moduleId: any, moduleName : string ) {
    const dialogRef = this.dialog.open(DeleteVideoLabDialogComponent, {
      width: '20%',
      data: {
        deleteModule : true,
        courseId: courseId,
        moduleId: moduleId,
        moduleName: moduleName,
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-danger',
          'module deleted Successfully...!!!',
          'center',
          'center'
        );
        window.location.reload()
      }
    });

  }

  ngOnInit(): void {
    this.checkEnrollement();
    this.courseService.getCourseById(this.courseId).subscribe((course1) => {
      this.contributorTeachers = course1.teachers;
    });
   }
   getUserScore(quizzId:number): any{
    this.courseService.getScoreInModule(this.user, quizzId).subscribe(res=>{
      console.log(res)
      return res
    })
   }
  onInputFocusOut() {
    this.isEditMode = false;  // set the flag to close the input
  }

 checkEnrollement(){
    this.studentService.isEnrolled(this.courseId,this.user).subscribe(res=>{
      if(res ==='true'){
        this.is_enrolled = true
      }
    })
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
        window.location.reload()
      }
    });

  }
  editVideo( courseId: number, moduleId: any, videoId : number , video : Video) {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      width: '50%',
      data: {
        edit : true,
        courseId: courseId,
        moduleId: moduleId,
        videoId: videoId,
        video : video
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'video edited Successfully...!!!',
          'center',
          'center'
        );
        window.location.reload()
      }
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
        window.location.reload()
      }
    });

  }
  addLab( courseId: number, moduleId: any, moduleName : string) {
    const dialogRef = this.dialog.open(AddLabComponent, {
      width: '60%',
      data: {
        courseId: courseId,
        moduleId: moduleId,
        moduleName: moduleName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.showNotification(
          'snackbar-success',
          'lab added Successfully...!!!',
          'center',
          'center'
        );
        // window.location.reload()
      }
    });
  }
  editLab( courseId: number, moduleId: any, moduleName:string,labId : number , lab : Lab) {
    const dialogRef = this.dialog.open(AddLabComponent, {
      width: '60%',
      data: {
        editLab : true,
        courseId: courseId,
        moduleId: moduleId,
        moduleName : moduleName,
        labId: labId,
        lab : lab
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'lab edited Successfully...!!!',
          'center',
          'center'
        );
        // window.location.reload()
      }
    });

  }
  deleteLab( courseId: number, moduleId: any,  labId: any,moduleName : string ,labTitle : string) {
    const dialogRef = this.dialog.open(DeleteVideoLabDialogComponent, {
      width: '20%',
      data: {
        deleteLab : true,
        courseId: courseId,
        moduleId: moduleId,
        labId: labId,
        moduleName: moduleName,
        labTitle : labTitle
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-danger',
          'lab deleted Successfully...!!!',
          'center',
          'center'
        );
        window.location.reload()
      }
    });

  }

  addQuizz( courseId: number, moduleId: any, moduleName : string) {
    const dialogRef = this.dialog.open(AddQuizzComponent, {
      width: '60%',
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
          'quizz added Successfully...!!!',
          'center',
          'center'
        );
        // window.location.reload()
      }
    });
  }
  editQuizz( quizzId: number, moduleId: any, moduleName : string, quizzName : string , quizz: any) {
    const dialogRef = this.dialog.open(AddQuizzComponent, {
      width: '60%',
      data: {
        editQuizz:true,
        quizzId: quizzId,
        moduleId: moduleId,
        moduleName: moduleName,
        quizzName: quizzName,
        quizz: quizz,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'quizz edited Successfully...!!!',
          'center',
          'center'
        );
        window.location.reload()
      }
    });
  }
  startQuizz( courseId: number, moduleId: any, quizzName: string , quizz: any) {
    const dialogRef = this.dialog.open(StartQuizzComponent, {
      width: '50%',
      data: {
        courseId: courseId,
        moduleId: moduleId,
        quizzName: quizzName,
        quizz : quizz,
        userId: this.user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-success',
          'quizz added Successfully...!!!',
          'center',
          'center'
        );
        // window.location.reload()
      }
    });
  }

  deleteQuizz(moduleId: any,  quizzId: any,moduleName : string ,quizzTitle : string) {
    const dialogRef = this.dialog.open(DeleteVideoLabDialogComponent, {
      width: '20%',
      data: {
        deleteQuizz: true,
        moduleId: moduleId,
        quizzId: quizzId,
        moduleName: moduleName,
        quizzTitle : quizzTitle
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showNotification(
          'snackbar-danger',
          'quizz deleted Successfully...!!!',
          'center',
          'center'
        );
        window.location.reload()
      }
    });

  }
  startSession(courseId: number,lab_id: number) {
    console.log(lab_id)
    this.isLoadingStart = true;
    this.spinner.show();

    if (this.course.status==='pending' || this.course.status==='update_pending_approval' ) {
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

      this.adminService.createCustomAmi(courseId, lab_id).subscribe(response => {
        console.log(response)
        this.showNotification(
          'snackbar-success',
          'AMI created Successfully...!!!',
          'center',
          'center'
        );
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

  percentageMap = new Map<string, Observable<any>>();

  getQuizPercentage(quizId: number): Observable<any> {
    const key = `${this.user}-${quizId}`;

    if (this.percentageMap.has(key)) {
      return this.percentageMap.get(key);
    }

    const percentage$ = this.courseService.getScoreInModule(this.user, quizId).pipe(
      map(res =>res),
      shareReplay(1)
    );

    this.percentageMap.set(key, percentage$);

    return percentage$;
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
