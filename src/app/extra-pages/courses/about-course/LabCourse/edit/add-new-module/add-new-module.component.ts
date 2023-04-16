import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {Course} from "../../../../../../core/models/course";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CourseService} from "../../../../../../core/service/course.service";
import {Video} from "../../../../../../core/models/Module";
import {MatSidenav} from "@angular/material/sidenav";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './add-new-module.component.html',
  styleUrls: ['./add-new-module.component.sass'],
})
export class AddNewModule implements OnInit {
  action: string;
  dialogTitle: string;
  moduleForm: UntypedFormGroup;
  course: Course
  mode = new UntypedFormControl('side');
  showAddLabButton = true;
  isNewEvent = false;
  videos: Video[] = [];
  // @ts-ignore
  selectedVideoIndex: number;
  @ViewChild('sidenav') sidenav: MatSidenav;
  selectedLabFiles: File = null;
  selectedLibrariesRequirements: File = null;
  selectedPackagesRequirements: File = null;
  loading = false
  constructor(
    public dialogRef: MatDialogRef<AddNewModule>,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private courseService: CourseService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.dialogTitle = data.course.name;
    this.course = data.course

    this.moduleForm = this.createModule();
  }

  ngOnInit(): void {
  }
  onLabFilesSelected(event) {
    this.selectedLabFiles = event.target.files[0];
  }
  onLibrariesRequirementsSelected(event) {
    this.selectedLibrariesRequirements = <File>event.target.files[0];
  }

  onPackagesRequirementsSelected(event) {
    this.selectedPackagesRequirements = <File>event.target.files[0];
  }
  toggle(video: { done: boolean }, nav: MatSidenav) {
    nav.close();
    video.done = !video.done;
  }



  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
  }

  addNewTask(nav: MatSidenav) {
    const videos = this.getVideosControls();
    this.selectedVideoIndex = videos.length - 1;
    this.isNewEvent = true;
    nav.open();
  }

  closeSlider(nav: MatSidenav) {
    nav.close();
  }



  getVideosControls(): FormArray {
    return this.moduleForm.get('videos') as FormArray;
  }

  add_video(index: number): void {
    const videos = this.moduleForm.get('videos') as FormArray;
    console.log('unitially', videos.value)
    const video = (this.moduleForm.get('videos') as FormArray).at(index);
    videos.push(this.createVideo(video.value));
    console.log('after pushing', videos.value)
    // this.videos.push(videos.value[0]);
    // if (!this.videos[moduleIndex]) {
    //   this.videos[moduleIndex] = [];
    // }
    this.videos.push(videos.value[videos.length - 1]);
    console.log('-------------------', this.videos)
    // console.log('super course form value', this.courseForm.value.modules[0].videos)
    console.log('super module form value', this.moduleForm.value)
  }

  getLabsControls(): FormArray {
    return  this.moduleForm.get('labs') as FormArray;
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  createModule(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      videos: this.fb.array([this.createInitialVideo()]),
      labs: this.fb.array([this.createLab()]),
    });
  }

  createInitialVideo(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      video_file: ['', [Validators.required]],
    });
  }

  createVideo(value: any): FormGroup {
    return this.fb.group({
      name: [value.name, [Validators.required]],
      duration: [value.duration, [Validators.required]],
      video_file: [value.video_file, [Validators.required]],
    });
  }

  createLab(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
      session_duration: [''],
      nb_sessions: [''],
      vm_characteristics: [''],
      labFiles: [''],
      packages_requirements: [''],
      libraries_requirements: [''],
      hosting_platform: [''],

    });
  }

  addLab(): void {
    const labs = this.moduleForm.get('labs') as FormArray;
    labs.push(this.createLab());
    this.showAddLabButton = false;

  }
  removeLab( index: number) {
    const labs = this.moduleForm.get('labs') as FormArray;
    labs.removeAt(index);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, 'close', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable

  public confirm(): void {
    this.loading = true;

    console.log(this.moduleForm.value);

    const formData = new FormData();
    for (let j = 1; j < this.moduleForm.value.videos.length; j++) {
      const video = this.moduleForm.value.videos[j];

      // Add the video's name and duration to the FormData object
      formData.append(`videos[${j}][name]`, video.name);
      formData.append(`videos[${j}][duration]`, video.duration);
      formData.append(`videos[${j}][video_file]`, video.video_file);
    }

    // Loop over the labs array for this module and add each lab's data to the FormData object
    if (this.moduleForm.value.labs[0].title == '') {
      console.log(this.moduleForm.value.labs[0])
      this.removeLab(0)
      this.moduleForm.value.labs.length = 0
    }
    for (let j = 0; j < this.moduleForm.value.labs.length; j++) {
      const lab = this.moduleForm.value.labs[j];
      if (lab.hosting_platform == 'aws') {
        // Add the lab's session duration, number of sessions, VM characteristics, and file uploads to the FormData object
        formData.append(`labs[${j}][is_hosted_on_aws]`, 'True');
        formData.append(`labs[${j}][title]`, lab.title);
        formData.append(`labs[${j}][description]`, lab.description);
        formData.append(`labs[${j}][session_duration]`, lab.session_duration);
        formData.append(`labs[${j}][nb_sessions]`, lab.nb_sessions);
        formData.append(`labs[${j}][vm_characteristics]`, lab.vm_characteristics);
        formData.append(`labs[${j}][labFiles]`, lab.labFiles);
        formData.append(`labs[${j}][libraries_requirements]`, lab.libraries_requirements);
        formData.append(`labs[${j}][packages_requirements]`, lab.packages_requirements);
      } else {
        formData.append(`labs[${j}][is_hosted_on_aws]`, 'False');
        formData.append(`labs[${j}][title]`, lab.title);
        formData.append(`labs[${j}][description]`, lab.description);
        formData.append(`labs[${j}][labFiles]`, lab.labFiles);
        formData.append(`labs[${j}][libraries_requirements]`, lab.libraries_requirements);
        formData.append(`labs[${j}][packages_requirements]`, lab.packages_requirements);
      }
    }
    formData.append(`name`, this.moduleForm.value.name);
    formData.append(`course`, this.course.id.toString());

    this.courseService.addModule(this.course.id,formData).subscribe(res=>{
      console.log(res)
      if(res){
        this.loading= false
        this.dialogRef.close(res);
      }
    })

  }
}
