import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-locked',
  templateUrl: './reset_password.component.html',
  styleUrls: ['./reset_password.component.scss'],
})
export class Reset_passwordComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  token: string;
  userId: any;
  hide = true;
  loading=false
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,


  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      this.userId = params.user_id;
      this.token = params.token;

    })

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading=true
    if (this.authForm.invalid) {
      return;
    } else {
      this.loading=false
      this.authService.resetPassword(this.userId,this.token,this.authForm.value.password,this.authForm.value.confirm_password).subscribe(res=>{
        if(res){
          this.loading=false
          if(res==='Passwords do not match'){
            this.showNotification(
              'snackbar-danger',
              'Passwords do not match',
              'bottom',
              'center'
            );
          }else{
            this.showNotification(
              'snackbar-success',
              'Password updated successfully',
              'bottom',
              'center'
            );
            this.router.navigate(['/authentication/signin']);

          }
        }
      })
    }
  }
}
