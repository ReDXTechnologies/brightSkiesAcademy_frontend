import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DepartmentService} from "../../../core/service/department.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../core/models/user";
import {AuthService} from "../../../core/service/auth.service";
import {Department} from "../../../core/models/department";
import {TeacherService} from "../../../core/service/teacher.service";

@Component({
  selector: 'app-add-sub-department',
  templateUrl: './add-sub-department.component.html',
  styleUrls: ['./add-sub-department.component.sass'],
})
export class AddSubDepartmentComponent implements OnInit{
  departmentForm: UntypedFormGroup;
  HeadDepartmentForm: UntypedFormGroup;
  HeadSubDepartments: User[];
  superDep: Department[];
  loading = false;
  Head_loading = false;
  submitted = false;
  Head_submitted = false;
  hide = true;
  role: any
  userId : number;
  user_id: string;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private departmentService: DepartmentService, private datePipe: DatePipe) {
    this.role = this.authService.currentUserValue.role[0];
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      head_of_department: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      department_start_date: [''],
      super_department: [''],
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
  private getSuperDepartments() {
    if(this.role!=='Super_Admin'){
      this.departmentService.getSuperDepByUserId(this.user_id).subscribe(value => {
        if (!!value) {
          this.superDep = value;
          //console.log(this.superDep)
        }
      })
    }else{
      this.departmentService.getSuperDepartments().subscribe(value => {
        if (!!value) {
          this.superDep = value;
          //console.log(this.superDep)
        }
      });
    }

  }
  navigateToSubDEpTab(tabId: string) {
    this.router.navigateByUrl('/admin/departments/all-departments#'+tabId);
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
    this.getHeadsOfSubDepartments();
    this.getSuperDepartments();
  }

  private getHeadsOfSubDepartments() {
    this.departmentService.getNewlyCreatedHeadsOfSubDepartments().subscribe(value => {
      if (!!value) {
        this.HeadSubDepartments = value;
        //console.log(this.HeadSubDepartments)
      }
    });
  }
  addHeadOfSubDepartment() {
    this.Head_submitted = true;
    this.Head_loading = true;

    this.authService.signup(this.HeadDepartmentForm.value.email,
      this.HeadDepartmentForm.value.password,
      this.HeadDepartmentForm.value.firstName,
      this.HeadDepartmentForm.value.lastName,
      this.HeadDepartmentForm.value.mobile_phone,
      this.HeadDepartmentForm.value.gender,
      'head_sub_department'
    ).subscribe(res => {

      this.showNotification(
        'snackbar-success',
        'head of super department created successfully !',
        'bottom',
        'center'
      );
      this.Head_loading = false;
      this.getHeadsOfSubDepartments();

      // this.router.navigateByUrl('sessions/signin3');

    });  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const data = {
      "name": this.departmentForm.value.name,
      "email": this.departmentForm.value.email,
      "department_start_date": this.datePipe.transform(this.departmentForm.value.department_start_date, 'yyyy-MM-dd'),
      "budget": this.departmentForm.value.budget,

    }
    this.departmentService.createSubDepartment(data,this.departmentForm.value.head_of_department,this.departmentForm.value.super_department).subscribe(res => {
      //console.log(res)
      if(res ==='Super department does not have enough budget'){
        this.loading = false;
        this.showNotification(
          'snackbar-danger',
          'Super department does not have enough budget !',
          'bottom',
          'center'
        );
      }
      else{
        this.loading = false;
        this.showNotification(
          'snackbar-success',
          'department added successfully !',
          'bottom',
          'center'
        );
        this.navigateToSubDEpTab('sub_departments')
      }
    })
  }


}
