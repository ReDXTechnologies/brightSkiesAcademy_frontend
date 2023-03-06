import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {UntypedFormControl, Validators} from "@angular/forms";
import {User} from "../../core/models/user";
import {StudentService} from "../../core/service/student.service";
import {Student} from "../../core/models/student";
@Component({
  selector: 'app-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  hide = true;
  student : Student;
  constructor(private studentService : StudentService) {}
  ngOnInit() {
    this.getStudentDetails(localStorage.getItem('id'))
  }

  getStudentDetails(studentId: string){
    this.studentService.getStudent(studentId).subscribe(student=>{
      this.student = student;
      console.log("eeeeeeeeeeee",student)
    })
  }

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
