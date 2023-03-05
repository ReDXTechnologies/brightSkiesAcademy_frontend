import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { formatDate } from '@angular/common';
import {Student} from "../../../../../core/models/student";
import {StudentService} from "../../../../../core/service/student.service";
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Student;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.name;
      this.students = data.students;
    } else {
      this.dialogTitle = 'New Students';
      this.students = new Student();
    }
    this.stdForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required
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
      id: [this.students.id],
      image: [this.students.user.image],
      firstName: [this.students.user.firstName],
      lastName: [this.students.user.lastName],
      email: [
        this.students.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: [this.students.user.gender],
      mobile_phone: [this.students.user.mobile_phone],
      speciality: [this.students.speciality],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const user = {
      "firstName": this.stdForm.value.firstName,
      "lastName": this.stdForm.value.lastName,
      "gender": this.stdForm.value.gender,
      "email": this.stdForm.value.email,
      "mobile_phone": this.stdForm.value.mobile_phone
    }

    const updateObject = {
      user,
      "speciality": this.stdForm.value.speciality,
    };

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(updateObject);  }
}
