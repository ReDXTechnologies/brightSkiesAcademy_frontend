import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,} from '@angular/forms';
import {Teacher} from "../../../../../core/models/teacher";
import {TeacherService} from "../../../../../core/service/teacher.service";
import {DepartmentService} from "../../../../../core/service/department.service";
import {Department} from "../../../../../core/models/department";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teacher;
  department: string;
  departments: Department[];

  // @ts-ignore


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private departmentService: DepartmentService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teachersService: TeacherService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.dialogTitle = data.teachers.name;
    this.teachers = data.teachers;

    this.proForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.getDepatments();
    console.log(this.teachers)
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
      id: [this.teachers.user.id],
      image: [this.teachers.user.image],
      firstName: [this.teachers.user.firstName],
      lastName: [this.teachers.user.lastName],
      email: [
        this.teachers.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      gender: [this.teachers.user.gender],
      mobile_phone: [this.teachers.user.mobile_phone],
      department: [this.teachers.department],
      degree: [this.teachers.degree],
    });
  }

  private getDepatments() {
    this.departmentService.getDepartments().subscribe(value => {
      if (!!value) {
        this.departments = value;
        console.log(this.departments)
      }
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable

  public confirmAdd(): void {

    console.log(this.proForm.value.department)
    const user = {
      "firstName": this.proForm.value.firstName,
      "lastName": this.proForm.value.lastName,
      "gender": this.proForm.value.gender,
      "email": this.proForm.value.email,
      "mobile_phone": this.proForm.value.mobile_phone
    }

    const updateObject = {
      user,
      "degree": this.proForm.value.degree,
    };
    const department = this.proForm.value.department

    const data = {
      updateObject,
      department
    };

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(data);

  }
}
