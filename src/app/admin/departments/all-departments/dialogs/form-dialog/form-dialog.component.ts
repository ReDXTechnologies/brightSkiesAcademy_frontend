import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {Department} from "../../../../../core/models/department";
import {DepartmentService} from "../../../../../core/service/department.service";
import {DatePipe} from "@angular/common";
import {User} from "../../../../../core/models/user";
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  departmentForm: UntypedFormGroup;
  department: Department;
  HeadSuperDepartments: User[];
  HeadSubDepartments: User[];


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentService: DepartmentService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder
  ) {
    console.log('******************',data.department)
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Edit " + data.department.name;
      this.department = data.department;
    } else {
      this.dialogTitle = 'Add new Department';
      this.department = new Department();
    }
    this.departmentForm = this.createContactForm();
    this.getHeadsOfSuperDepartments();
    this.getHeadsOfSubDepartments();
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
    if(this.data.editSuperDep){
      return this.fb.group({
        id: [this.department.id],
        name: [this.department.name, [Validators.required]],
        head_of_super_department: [this.data.department.head_of_super_department.id , [Validators.required]],
        email: [
          this.department.email,
          [Validators.required, Validators.email, Validators.minLength(5)]
        ],
        department_start_date: [this.department.department_start_date, [Validators.required]],
        budget: [this.department.budget,Validators.required],


      });
    }else{
      return this.fb.group({
        id: [this.department.id],
        name: [this.department.name, [Validators.required]],
        head_of_sub_department: [this.data.department.head_of_sub_department.id , [Validators.required]],
        email: [
          this.department.email,
          [Validators.required, Validators.email, Validators.minLength(5)]
        ],
        department_start_date: [this.department.department_start_date, [Validators.required]],
        budget: [this.department.budget, [Validators.required]],

      });
    }

  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.data.editSuperDep) {

      const data = {
        "name": this.departmentForm.value.name,
        "head_of_super_department": this.departmentForm.value.head_of_super_department,
        "email": this.departmentForm.value.email,
        "budget": this.departmentForm.value.budget,
        "department_start_date": this.datePipe.transform(this.departmentForm.value.department_start_date, 'yyyy-MM-dd')
      }
      console.log(data)
      this.departmentService.updateSuperDepartment(data, this.departmentForm.value.id , this.departmentForm.value.head_of_super_department).subscribe(res=>{
        this.dialogRef.close(res)
      });
    }
    else{
      const data = {
        "name": this.departmentForm.value.name,
        "head_of_sub_department": this.departmentForm.value.head_of_super_department,
        "email": this.departmentForm.value.email,
        "budget": this.departmentForm.value.budget,
        "department_start_date": this.datePipe.transform(this.departmentForm.value.department_start_date, 'yyyy-MM-dd')
      }
      console.log(data)
      this.departmentService.updateSubDepartment(data, this.departmentForm.value.id,this.departmentForm.value.head_of_sub_department).subscribe(res=>{
        this.dialogRef.close(res)

      });
    }

  }
  private getHeadsOfSuperDepartments() {
    this.departmentService.getHeadsOfSuperDepartments().subscribe(value => {
      if (!!value) {
        this.HeadSuperDepartments = value;
        console.log(this.HeadSuperDepartments)
      }
    });
  }
  private getHeadsOfSubDepartments() {
    this.departmentService.getHeadsOfSubDepartments().subscribe(value => {
      if (!!value) {
        this.HeadSubDepartments = value;
        console.log(this.HeadSubDepartments)
      }
    });
  }
}
