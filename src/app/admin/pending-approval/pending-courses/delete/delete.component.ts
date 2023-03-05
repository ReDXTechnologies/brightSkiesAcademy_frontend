import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {TeacherService} from "../../../../core/service/teacher.service";
import {CourseService} from "../../../../core/service/course.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: CourseService
  ) {}
  onNoClick(): void {
    console.log('cancel')
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log(this.data.id)
    this.courseService.rejectCourse(this.data.id).subscribe(
      data => {
        console.log('Course rejected successfully');
        // update course list or show success message
      },
      error => {
        console.error('Error rejecting course:', error);
        // show error message
      }
    );
  }
}
