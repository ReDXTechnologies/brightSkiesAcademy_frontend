import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {TeacherService} from "../../../../../core/service/teacher.service";
import {CourseService} from "../../../../../core/service/course.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-delete',
  templateUrl: './rejection-email.html',
  styleUrls: ['./rejection-email.sass'],
})
export class RejectionEmail implements OnInit {
  rejectionEmail: UntypedFormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<RejectionEmail>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: CourseService,
  ) {
  }

  ngOnInit() {
    this.rejectionEmail = this.formBuilder.group({
      emailText: [
        '', [Validators.required],
      ],
    });

  }

  get f() {
    return this.rejectionEmail.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  writeFeedback(): void {
    console.log(this.data.id)
    this.loading = true
    this.courseService.rejectCourse(this.data.courseId, this.rejectionEmail.value)
      .subscribe(res => {
        if (res) {
          this.loading = false;
          this.dialogRef.close(res);
        }
      });
  }
}
