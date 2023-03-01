import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import {Teacher} from "../../../../../core/models/teacher";
import {TeacherService} from "../../../../../core/service/teacher.service";
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teacher;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teachersService: TeacherService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.name;
      this.teachers = data.teachers;
    } else {
      this.dialogTitle = 'New Teachers';
      this.teachers = new Teacher();
    }
    this.proForm = this.createContactForm();
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.teachers.id],
      img: [this.teachers.image],
      name: [this.teachers.firstName],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      gender: [this.teachers.gender],
      mobile: [this.teachers.mobile_phone],
      department: [this.teachers.department],
      degree: [this.teachers.degree],
      uploadFile: [''],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.teachersService.addTeachers(this.proForm.getRawValue());
  }
}
