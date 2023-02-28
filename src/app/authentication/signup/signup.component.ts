import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {formatDate} from "@angular/common";
import {AuthService} from "../../core/service/auth.service";
import {last} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Role} from "../../core/models/role";
import {UnsubscribeOnDestroyAdapter} from "../../shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent   extends UnsubscribeOnDestroyAdapter
   implements OnInit {
  authForm: UntypedFormGroup;
  returnUrl: string;
  message= '';
  hide = true;
  chide = true;
  stdForm: UntypedFormGroup;
  selectedValue: string;
  loading = false;
  submitted = false;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,

  ) {
    super();

    this.stdForm = this.createContactForm();
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, 'close', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onSelectionChange() {
    console.log(this.stdForm.value.selectedValue)
    // update selectedValue with the value of the selected radio button
    this.selectedValue = this.stdForm.value.selectedValue;
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
      selectedValue: '',

    });
  }
  submit() {
    this.submitted = true;
    this.loading = true;

    this.subs.sink = this.authService.signup(this.stdForm.value.email,
      this.stdForm.value.password,
      this.stdForm.value.firstName,
      this.stdForm.value.lastName,
      this.stdForm.value.mobile_phone,
      this.stdForm.value.gender,
      this.selectedValue
    ).subscribe(res => {
      setTimeout(() => {
        this.showNotification(
          'snackbar-success',
          res.message,
          'bottom',
          'center'
        );
        this.loading = false;
      }, 1000);
      // this.router.navigateByUrl('sessions/signin3');

    });  }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // get f() {
  //   return this.authForm.controls;
  // }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.message='';
    }
  }
}
