import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../../../core/service/auth.service";
import {AdminService} from "../../../../../core/service/admin.service";
import {NgxSpinnerService} from "ngx-spinner";
import {StudentService} from "../../../../../core/service/student.service";
import {CourseService} from "../../../../../core/service/course.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Lab} from "../../../../../core/models/Module";
import {Course} from "../../../../../core/models/course";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {AddLabComponent} from "../edit/add-lab/add-lab.component";
import {DeleteVideoLabDialogComponent} from "../edit/delete/delete.component";

@Component({
  selector: 'app-lab-component',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit{
  instanceUrl: any;
  constructor(public dialog: MatDialog, private authService: AuthService,
              private adminService: AdminService,
              private spinner: NgxSpinnerService,
              private studentService: StudentService,
              private courseService: CourseService,
              private snackBar: MatSnackBar,
              private elementRef: ElementRef

  ) {
    this.role = this.authService.currentUserValue.role[0];

  }
  @Input() lab: any;
  @Input() courseId: number;
  @Input() course: Course;
  @Input() user: number;
  @Input() teacher_id: number;
  @Input() module: any;
  isLoading = false;
  isLoadingStart = false;
  is_enrolled = false;
  contributorTeachers: number[] = [];
  role: any;
  sessionsRemainingMap = new Map<string, Observable<string>>();
  user_id: string;
  userId: number;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id);
    this.checkEnrollement();
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.course = course;
      this.contributorTeachers = this.course.teachers; });
  }
  startSession(courseId: number, lab_id: number) {
    console.log(lab_id);
    this.isLoadingStart = true;
    this.spinner.show();

    if (this.course.status ==='pending' || this.course.status==='update_pending_approval' ) {
      this.adminService.launchSession(this.user, courseId, lab_id).subscribe(response => {
        console.log(response)
        this.isLoadingStart = false;
        this.spinner.hide();
        this.instanceUrl = response.instance_url;
        // window.open(response.instance_url, '_blank');
      });
    } else {
      this.studentService.launchSession(this.user, courseId, lab_id).subscribe(response => {
        console.log(response)

        this.isLoadingStart = false;

        this.instanceUrl = response.instance_url;
        this.spinner.hide();
        // window.open(response.instance_url, '_blank');
      });
    }
  }
  createCustomAmi(courseId: number, lab_id: number) {
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
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
  editLab( courseId: number, moduleId: any, moduleName: string, labId : number , lab : Lab) {
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
        window.location.reload()
      }
    });

  }
  deleteLab( courseId: number, moduleId: any,  labId: any, moduleName : string , labTitle : string) {
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
  checkEnrollement(){
    this.studentService.isEnrolled(this.courseId,this.user).subscribe(res=>{
      if (res === 'true'){
        this.is_enrolled = true
      }
    });
  }


}
