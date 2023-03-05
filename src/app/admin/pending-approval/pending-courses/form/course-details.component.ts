import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import {TeacherService} from "../../../../core/service/teacher.service";
import {Course} from "../../../../core/models/course";

@Component({
  selector: 'app-form',
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.component.sass'],
})
export class CourseDetailsComponent {
  action: string;
  dialogTitle: string;
  course: Course;
  constructor(
    public dialogRef: MatDialogRef<CourseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: TeacherService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
