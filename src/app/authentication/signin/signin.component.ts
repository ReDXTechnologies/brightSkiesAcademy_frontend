import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }
  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);
    // const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(password));

    this.authForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: password,
      }
    );
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f.email.value, this.f.password.value).subscribe(res=>{
              if (res) {
                  const role = this.authService.currentUserValue.role[0];
                  console.log(role)
                  if (role === Role.Super_Admin || role === Role.Admin) {
                    this.router.navigate(['/admin/dashboard/main']);
                  } else if (role === Role.Teacher) {
                    this.router.navigate(['/teacher/teacher-profile']);
                  } else if (role === Role.Student) {
                    this.router.navigate(['/student/dashboard']);
                  } else {
                    this.router.navigate(['/authentication/signin']);
                  }
                  this.loading = false;
              } else {
                this.error = 'Invalid Login';
              }
            },
            (error) => {
              this.error = error;
              this.submitted = false;
              this.loading = false;
            }
        )
    }
  }
}
