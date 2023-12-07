import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {UntypedFormBuilder} from "@angular/forms";
import {AuthService} from "../../../../../../core/service/auth.service";
import {DepartmentService} from "../../../../../../core/service/department.service";
import {TeacherService} from "../../../../../../core/service/teacher.service";
import {Course} from "../../../../../../core/models/course";
import {Teacher} from "../../../../../../core/models/teacher";
import {Department} from "../../../../../../core/models/department";

@Component({
  selector: 'app-show-contributor',
  templateUrl: './show-contributor.component.html',
  styleUrls: ['./show-contributor.component.scss']
})
export class ShowContributorComponent {

  action: string;
  dialogTitle: string;
  course: Course;
  teachers: Teacher[];
  role: any;
  userId: number;
  user_id: string;
  departments: Department[];
  constructor(
    public dialogRef: MatDialogRef<ShowContributorComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private teacherService: TeacherService
  ) {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id);
    this.role = this.authService.currentUserValue.role[0];
    // Set the defaults
    this.dialogTitle = data.course.title;
    this.teachers = data.teachers;
    this.course = data.course;
  }


}
