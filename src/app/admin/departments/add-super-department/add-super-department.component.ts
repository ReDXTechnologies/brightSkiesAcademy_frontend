import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DepartmentService} from "../../../core/service/department.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../core/models/user";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-add-super-department',
  templateUrl: './add-super-department.component.html',
  styleUrls: ['./add-super-department.component.sass'],
})
export class AddSuperDepartmentComponent implements OnInit{
  departmentForm: UntypedFormGroup;
  HeadDepartmentForm: UntypedFormGroup;
  HeadSuperDepartments: User[];
  loading = false;
  Head_loading = false;
  submitted = false;
  Head_submitted = false;
  hide = true;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private departmentService: DepartmentService, private datePipe: DatePipe) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      head_of_department: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      department_start_date: [''],
      budget: ['',Validators.required],

    });

    this.HeadDepartmentForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      // speciality: ['',Validators.required],
      email: ['',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: ['',Validators.required],
      mobile_phone: ['',Validators.required],
      // department: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],

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


  ngOnInit(): void {
    this.getHeadsOfSuperDepartments();
  }

  private getHeadsOfSuperDepartments() {
    this.departmentService.getNewlyCreatedHeadsOfSuperDepartments().subscribe(value => {
      if (!!value) {
        this.HeadSuperDepartments = value;
        console.log(this.HeadSuperDepartments)
      }
    });
  }
  addHeadOfSuperDepartment() {
    this.Head_submitted = true;
    this.Head_loading = true;

    this.authService.signup(this.HeadDepartmentForm.value.email,
      this.HeadDepartmentForm.value.password,
      this.HeadDepartmentForm.value.firstName,
      this.HeadDepartmentForm.value.lastName,
      this.HeadDepartmentForm.value.mobile_phone,
      this.HeadDepartmentForm.value.gender,
      'head_super_department'
    ).subscribe(res => {

      this.showNotification(
        'snackbar-success',
        'head of super department created successfully !',
        'bottom',
        'center'
      );
      this.Head_loading = false;
      this.getHeadsOfSuperDepartments();

      // this.router.navigateByUrl('sessions/signin3');

    });  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const data = {
      "name": this.departmentForm.value.name,
      "email": this.departmentForm.value.email,
      "budget": this.departmentForm.value.budget,
      "department_start_date": this.datePipe.transform(this.departmentForm.value.department_start_date, 'yyyy-MM-dd')
    }
    console.log("*****************",this.departmentForm.value.head_of_department)
    this.departmentService.createSuperDepartment(data,this.departmentForm.value.head_of_department).subscribe(res => {
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
