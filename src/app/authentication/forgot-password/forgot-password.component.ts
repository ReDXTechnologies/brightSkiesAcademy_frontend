import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../core/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,

  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.forgetPassword(this.authForm.value.email).subscribe(res=>{
        if(res){
          this.loading = false;
          if(res==='This email address does not exist'){
            this.showNotification(
              'snackbar-danger',
              'This email address does not exist',
              'bottom',
              'center'
            );
          }else{
            this.showNotification(
              'snackbar-success',
              'check your email , we have send you a reset password link',
              'bottom',
              'center'
            );
          }

      }

      })
    }
  }
}
