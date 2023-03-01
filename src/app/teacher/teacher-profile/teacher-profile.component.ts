import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {TeacherService} from "../../core/service/teacher.service";
@Component({
  selector: 'app-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;

  hide = true;
  teacherForm: FormGroup;
  teacherData: any;
  user_id: string;
  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.teacherForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      degree: [''],
      mobile_phone: [''],
      biography: ['']
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onSubmit() {
    const teacherData = {
      degree: this.teacherForm.get('degree').value,
      biography: this.teacherForm.get('biography').value,
      user: {
        id: this.user_id,
        firstName: this.teacherForm.get('firstName').value,
        lastName: this.teacherForm.get('lastName').value,
        mobile_phone: this.teacherForm.get('mobile_phone').value
      }
    };

    // this.teacherService.updateTeacher(this.user_id, teacherData)
    //   .subscribe(response => {
    //     console.log(response);
    //     // Add any additional logic or actions here after the teacher has been updated
    //   });
  }



}
