import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {CourseService} from "../../../../../../core/service/course.service";

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.sass'],
})
export class AddVideoComponent implements OnInit {
  action: string;
  dialogTitle: string;
  videoForm: UntypedFormGroup;
  loading = false;
  loadingEdit = false;
  submitted = false;
  // @ts-ignore
  selectedVideo: File = null;


  constructor(
    public dialogRef: MatDialogRef<AddVideoComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private courseService : CourseService
  ) {
    // Set the defaults
    if(this.data.edit){
      this.dialogTitle = 'Edit video to module ' + this.data.moduleName;

    }else{
      this.dialogTitle = 'Add video to module ' + this.data.moduleName;

    }

    this.videoForm = this.createContactForm();
  }

  ngOnInit(): void {
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createContactForm(): UntypedFormGroup {
    if(this.data.edit){
      return this.fb.group({
        name: [this.data.video.name],
        duration: [this.data.video.duration],
        video_file: [this.data.video.video_file],
      });
    }else{
      return this.fb.group({
        name: [''],
        duration: [''],
        video_file: [''],
      });
    }

  }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable

  public confirmAdd(): void {
    this.submitted = true;
    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.videoForm.value.name);
    formData.append('duration', this.videoForm.value.duration);
    formData.append('video_file',  this.videoForm.value.video_file);
    formData.append('module',  this.data.moduleId);
    this.courseService.addVideoInModule(this.data.courseId, formData , this.data.moduleId).subscribe(res => {
      if(res){
        console.log(res)
        this.loading = false;

        this.dialogRef.close(res);
      }
      },
      error => {
        console.error(error);
        // show error message
      })

  }
  onVideoSelected(event) {
    this.selectedVideo = <File>event.target.files[0];
  }
  public confirmEdit(): void {
    this.submitted = true;
    this.loadingEdit = true;

    const formData = new FormData();
    formData.append('name', this.videoForm.value.name);
    formData.append('duration', this.videoForm.value.duration);
    if (this.selectedVideo) {
      formData.append('video_file',  this.selectedVideo);
    }
    formData.append('module',  this.data.moduleId);
    this.courseService.editVideoInModule(this.data.courseId, formData , this.data.moduleId, this.data.videoId                                                   ).subscribe(res => {
        if(res){
          console.log(res)
          this.loadingEdit = false;

          this.dialogRef.close(res);
        }
      },
      error => {
        console.error(error);
        // show error message
      })

  }
}
