import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  hide = true;
  role: any
  userId: string;
  formGroup: UntypedFormGroup;
  submitted = false;
  loading = false;

  constructor(private authService: AuthService,
              private fb: UntypedFormBuilder,
              private snackBar: MatSnackBar,

  ) {
    this.userId = localStorage.getItem('id');
    this.formGroup = this.createContactForm();

  }

  ngOnInit(): void {
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: ['',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: ['',Validators.required],
      new_password: ['',Validators.required],
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  submit() {
    this.submitted = true;
    this.loading = true;

    this.authService.changePassword(this.userId,this.formGroup.value.email,
      this.formGroup.value.password,
      this.formGroup.value.new_password,
    ).subscribe(res => {
      console.log(res)

      this.showNotification(
        'snackbar-success',
        'Password changed successfully',
        'bottom',
        'center'
      );
      this.loading = false;
    });  }

}
