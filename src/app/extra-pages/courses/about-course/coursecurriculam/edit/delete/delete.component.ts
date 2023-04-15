import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {Course} from "../../../../../../core/models/course";
import {CourseService} from "../../../../../../core/service/course.service";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteVideoLabDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVideoLabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService: CourseService
  ) {}
  loadingVideo = false
  loadingLab = false
  loadingModule = false

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {

    if(this.data.deleteVideo){
      this.loadingVideo = true;
      this.courseService.deleteVideoInModule(this.data.courseId, this.data.moduleId,this.data.videoId).subscribe(res=> {
      if(res){
        this.loadingVideo = false;
        this.dialogRef.close(res);
      }
      });

    }
    if(this.data.deleteModule){
      this.loadingModule = true;
      this.courseService.deleteModule(this.data.courseId, this.data.moduleId).subscribe(res=> {
        if(res){
          this.loadingModule = false;
          this.dialogRef.close(res);
        }
      });

    }
    if(this.data.deleteLab){
      this.loadingLab = true;
      this.courseService.deleteLabInModule(this.data.courseId, this.data.moduleId,this.data.labId).subscribe(res=> {
        if(res){
          this.loadingLab = false;
          this.dialogRef.close(res);
        }
      });

    }


  }
}
