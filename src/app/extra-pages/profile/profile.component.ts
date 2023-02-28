import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {UntypedFormControl, Validators} from "@angular/forms";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  hide = true;
  constructor() {}
  ngOnInit() {}

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
