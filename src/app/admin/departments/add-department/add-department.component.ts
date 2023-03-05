import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DepartmentService} from "../../../core/service/department.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.sass'],
})
export class AddDepartmentComponent {
  departmentForm: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private departmentService: DepartmentService, private datePipe: DatePipe) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      head_of_department: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      department_start_date: [''],

    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, 'close', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const data = {
      "name": this.departmentForm.value.name,
      "head_of_department": this.departmentForm.value.head_of_department,
      "email": this.departmentForm.value.email,
      "department_start_date": this.datePipe.transform(this.departmentForm.value.department_start_date, 'yyyy-MM-dd')
    }
    this.departmentService.create(data).subscribe(res => {
      console.log(res)
      this.showNotification(
        'snackbar-success',
        'department added successfully !',
        'bottom',
        'center'
      );
      this.router.navigate(['/admin/departments/all-departments']);

    })
  }
}
