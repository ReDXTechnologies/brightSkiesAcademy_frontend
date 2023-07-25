import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from "@angular/forms";
import { Course } from "../../../../../../core/models/course";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { AuthService } from "../../../../../../core/service/auth.service";
import { Department } from "../../../../../../core/models/department";
import { DepartmentService } from "../../../../../../core/service/department.service";
import { Teacher } from "../../../../../../core/models/teacher";
import { TeacherService } from "../../../../../../core/service/teacher.service";

interface ExtendedTeacher extends Teacher {
  selected: boolean;
}

@Component({
  selector: 'app-add-contributors',
  templateUrl: './add-contributors.component.html',
  styleUrls: ['./add-contributors.component.scss']
})
export class AddContributorsComponent implements OnInit {
  action: string;
  dialogTitle: string;
  course: Course;
  teachers: Teacher[];
  role: any;
  userId: number;
  user_id: string;
  departments: Department[];
  availableTeachers: ExtendedTeacher[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddContributorsComponent>,
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

  ngOnInit(): void {
    this.departmentService.getSuperDepartments().subscribe((value) => {
      this.departments = value;
    });
    this.availableTeachers = this.teachers.map((teacher) => ({ ...teacher, selected: false }));
  }

  onTeacherChange(event: any, teacher: ExtendedTeacher): void {
    // Toggle selected status for the teacher
    teacher.selected = event.target.checked;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasSelectedTeachers(): boolean {
    return this.availableTeachers.some((teacher) => teacher.selected);
  }
  public confirm(): void {
    const selectedTeacherIds = this.availableTeachers
      .filter((teacher) => teacher.selected)
      .map((teacher) => teacher.user.id);

    this.teacherService.addTeacherToCourse({ teacher_ids: selectedTeacherIds }, this.course.id).subscribe(() => {
      console.log("Teachers added successfully");
      window.location.reload();
    });

    this.dialogRef.close();
  }
}
