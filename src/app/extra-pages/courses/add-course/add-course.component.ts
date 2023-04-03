import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder, UntypedFormControl,
  Validators
} from '@angular/forms';
import {CourseService} from "../../../core/service/course.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../core/models/course";
import {Video} from "../../../core/models/Module";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatSidenav} from "@angular/material/sidenav";
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class
AddCourseComponent implements OnInit{
  isLinear = false;
  courseForm: FormGroup;
  selectedPlan = 'free';
  price: number;
  selectedStudentEmailsFile: File = null;
  selectedLabFiles: File = null;
  selectedLibrariesRequirements: File = null;
  selectedPackagesRequirements: File = null;
  selectedSlides: File = null;
  selectedImage: File = null;
  loading = false;
  submitted = false;
  canceled: boolean = false;
  course: Course;
  editMode: boolean = false;
  courseId: number;
  showAddLabButton = true;
  isNewEvent = false;
  videos: Video[][] = [];
  mode = new UntypedFormControl('side');
  @ViewChild('sidenav') sidenav: MatSidenav;
  selectedVideoIndex: number;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private courseService: CourseService, private _snackBar: MatSnackBar,
              private router: Router
  ) {
    const requiredForAdd = [Validators.required];
    const requiredForEdit = [];
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      workload: ['', [Validators.required]],
      nbr_of_lessons: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      course_id: [''],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      level: ['', [Validators.required]],
      what_you_will_learn: ['', [Validators.required]],
      image: [''],
      slides: [''],
      plan: ['free', Validators.required],
      price: [''],
      certified: ['yes', Validators.required],
      modules: this.fb.array([this.createModule()]),
    });

    //
    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params.courseId)
    //   if (params.edit && params.courseId) {
    //     this.editMode = true;
    //     this.courseId = params.courseId;
    //     this.courseService.getCourseById(this.courseId).subscribe(course => {
    //       console.log(course)
    //       this.course = course
    //       this.courseForm.patchValue({
    //         title: course.title,
    //         specialty: course.speciality,
    //         nbr_of_lessons: course.nbr_of_lessons,
    //         description: course.description,
    //         what_you_will_learn: course.what_you_will_learn,
    //         session_duration: course.session_duration,
    //         nb_sessions: course.nb_sessions,
    //         requirements: course.requirements,
    //         price: course.price,
    //         level: course.level,
    //         vm_characteristics: course.vm_characteristics,
    //         plan: course.free ? 'free' : 'paid',
    //         certified: course.certificate ? 'yes' : 'no',
    //         workload: course.workload,
    //         student_emails_file: this.editMode ? null : course.student_emails_file,
    //         labFiles: this.editMode ? null : course.labFiles,
    //         image: this.editMode ? null :course.image
    //       });
    //       if (this.editMode) {
    //         this.courseForm.get('labFiles').setValidators(requiredForEdit);
    //         this.courseForm.get('image').setValidators(requiredForEdit);
    //         this.courseForm.get('student_emails_file').setValidators(requiredForEdit);
    //       }
    //     });
    //   }
    //   console.log(this.editMode)
    //
    // });
  }
  selectVideo(index: number) {
    this.selectedVideoIndex = index;
  }


  toggle(video: { done: boolean }, nav: MatSidenav) {
    nav.close();
    video.done = !video.done;
  }

  deleteVideo(moduleIndex: number, videoIndex: number): void {
    const moduleVideos = this.getVideosControls(moduleIndex);
    console.log('ererererererererere',moduleVideos.value)
    moduleVideos.removeAt(videoIndex-1);
    console.log('cvcvcvcvcvcvcv',moduleVideos.value)

  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
  }
  // taskClick(video: Video, nav: MatSidenav) {
  //   console.log(video)
  //   this.isNewEvent = false;
  //   this.createVideo(video)
  //   nav.open()
  //
  // }
  addNewTask(nav: MatSidenav, moduleIndex: number) {
    const videos = this.getVideosControls(moduleIndex);
    this.selectedVideoIndex = videos.length - 1;
    this.isNewEvent = true;
    nav.open();
  }

  closeSlider(nav: MatSidenav) {
    nav.close();
  }
  get modules() {
    return this.courseForm.get('modules') as FormArray;
  }
  getVideosControls(moduleIndex: number): FormArray {
    const module = this.modules.controls[moduleIndex] as FormGroup;
    return module.controls.videos as FormArray;
  }

  add_video(moduleIndex: number,index: number): void {
    console.log('*************************************')
    console.log((this.modules.at(moduleIndex).get('videos') as FormArray).value)
    console.log('*************************************')
    const videos = (this.courseForm.get('modules') as FormArray).at(moduleIndex).get('videos') as FormArray;
    console.log('unitially',videos.value)
    const video = ((this.courseForm.get('modules') as FormArray).at(moduleIndex).get('videos') as FormArray).at(index);
    videos.push(this.createVideo(video.value));
    console.log('after pushing',videos.value)
    // this.videos.push(videos.value[0]);
    if (!this.videos[moduleIndex]) {
      this.videos[moduleIndex] = [];
    }
    this.videos[moduleIndex].push(videos.value[videos.length - 1]);
    console.log('-------------------',this.videos[moduleIndex])
    console.log('super course form value',this.courseForm.value.modules[0].videos)
    console.log('super course form value',this.courseForm.value)
  }
  // edit_video(moduleIndex: number,index: number): void {
  //   console.log('*************************************')
  //   console.log((this.modules.at(moduleIndex).get('videos') as FormArray).value)
  //   console.log('*************************************')
  //   const videos = (this.courseForm.get('modules') as FormArray).at(moduleIndex).get('videos') as FormArray;
  //   console.log('unitially',videos.value)
  //   const video = ((this.courseForm.get('modules') as FormArray).at(moduleIndex).get('videos') as FormArray).at(index);
  //   videos.push(this.createVideo(video.value));
  //   console.log('after pushing',videos.value)
  //   // this.videos.push(videos.value[0]);
  //   if (!this.videos[moduleIndex]) {
  //     this.videos[moduleIndex] = [];
  //   }
  //   this.videos[moduleIndex].push(videos.value[videos.length - 1]);
  //   console.log('-------------------',this.videos[moduleIndex])
  //   console.log('super course form value',this.courseForm.value.modules[0].videos)
  //   console.log('super course form value',this.courseForm.value)
  // }
  getLabsControls(moduleIndex: number): FormArray {
    return this.modules.at(moduleIndex).get('labs') as FormArray;
  }
  ngOnInit(): void {
    // this.addModule();
  }
  isFormValid() {
    return this.courseForm && this.courseForm.valid;
  }
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
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      session_duration: [''],
      nb_sessions: [''],
      vm_characteristics: [''],
      labFiles: [''],
      packages_requirements: ['', [Validators.required]],
      libraries_requirements: ['', [Validators.required]],
      hosting_platform: [''],

    });
  }

  addModule(): void {
    console.log(this.getVideosControls)
    const modules = this.courseForm.get('modules') as FormArray;
    modules.push(this.createModule());
    this.videos.push([]);

  }

  addLab(moduleIndex: number): void {
    const labs = (this.courseForm.get('modules') as FormArray).at(moduleIndex).get('labs') as FormArray;
    labs.push(this.createLab());
    this.showAddLabButton = false;

  }

  removeModule(index: number) {
    const modules = this.courseForm.get('modules') as FormArray;
    modules.removeAt(index);
  }
  removeVideo(moduleIndex: number, index: number) {
    const videos = (this.courseForm.get('modules') as FormArray).at(moduleIndex).get('videos') as FormArray;
    videos.removeAt(index);
  }
  removeLab(moduleIndex: number, index: number) {
    const labs = (this.courseForm.get('modules') as FormArray).at(moduleIndex).get('labs') as FormArray;
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
  onLabFilesSelected(event) {
    this.selectedLabFiles = event.target.files[0];
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  onSlidesSelected(event) {
    this.selectedSlides = <File>event.target.files[0];
  }
  onLibrariesRequirementsSelected(event) {
    this.selectedLibrariesRequirements = <File>event.target.files[0];
  }
  onPackagesRequirementsSelected(event) {
    this.selectedPackagesRequirements = <File>event.target.files[0];
  }
  selectFree() {
    this.selectedPlan = 'free';
  }
  selectPremium() {
    this.selectedPlan = 'premium';
  }

  cancelSubmission() {
    this.canceled = true;
    this.loading = false;
    // this.courseForm.reset();
  }
  navigateToCoursesTab(tabId: string) {
    this.router.navigateByUrl('/shared/courses#'+tabId);
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;


    const formData = new FormData();
    formData.append('title', this.courseForm.get('title').value);
    formData.append('speciality', this.courseForm.get('specialty').value);
    formData.append('nbr_of_lessons', this.courseForm.get('nbr_of_lessons').value);
    formData.append('description', this.courseForm.get('description').value);
    formData.append('what_you_will_learn', this.courseForm.get('what_you_will_learn').value);
    formData.append('requirements', this.courseForm.get('requirements').value);
    formData.append('level', this.courseForm.get('level').value);
    formData.append('certificate', this.courseForm.get('certified').value);
    formData.append('workload', this.courseForm.get('workload').value);
    formData.append('course_id ', this.courseForm.get('workload').value);

    // if (this.selectedLabFiles ) {
    //   formData.append('labFiles', this.selectedLabFiles, this.selectedLabFiles.name);
    // }
    if (this.selectedSlides ) {
      formData.append('slides', this.selectedSlides, this.selectedSlides.name);
    }
    if (this.selectedImage ) {
      formData.append('image', this.selectedImage);
    }
    // if (this.canceled) {
    //   this.loading = false;
    //   return;
    // }
    //   // Loop over the modules array and add each module's data to the FormData object
      for (let i = 0; i < this.courseForm.value.modules.length; i++) {
        const module = this.courseForm.value.modules[i];

        // Add the module's name to the FormData object
        formData.append(`modules[${i}][name]`, module.name);

        // Loop over the videos array for this module and add each video's data to the FormData object

        for (let j = 1; j < module.videos.length; j++) {
          const video = module.videos[j];

          // Add the video's name and duration to the FormData object
          formData.append(`modules[${i}][videos][${j}][name]`, video.name);
          formData.append(`modules[${i}][videos][${j}][duration]`, video.duration);
          formData.append(`modules[${i}][videos][${j}][video_file]`, video.video_file);
        }

        // Loop over the labs array for this module and add each lab's data to the FormData object
          for (let j = 0; j < module.labs.length; j++) {
            const lab = module.labs[j];
            if (lab.hosting_platform == 'aws') {
              // Add the lab's session duration, number of sessions, VM characteristics, and file uploads to the FormData object
              formData.append(`modules[${i}][labs][${j}][is_hosted_on_aws]`, 'True');
              formData.append(`modules[${i}][labs][${j}][title]`, lab.title);
              formData.append(`modules[${i}][labs][${j}][description]`, lab.description);
              formData.append(`modules[${i}][labs][${j}][session_duration]`, lab.session_duration);
              formData.append(`modules[${i}][labs][${j}][nb_sessions]`, lab.nb_sessions);
              formData.append(`modules[${i}][labs][${j}][vm_characteristics]`, lab.vm_characteristics);
              formData.append(`modules[${i}][labs][${j}][labFiles]`, lab.labFiles);
              formData.append(`modules[${i}][labs][${j}][libraries_requirements]`, lab.libraries_requirements);
              formData.append(`modules[${i}][labs][${j}][packages_requirements]`, lab.packages_requirements);
            } else {
              formData.append(`modules[${i}][labs][${j}][is_hosted_on_aws]`, 'False');
              formData.append(`modules[${i}][labs][${j}][title]`, lab.title);
              formData.append(`modules[${i}][labs][${j}][description]`, lab.description);
              formData.append(`modules[${i}][labs][${j}][labFiles]`, lab.labFiles);
              formData.append(`modules[${i}][labs][${j}][libraries_requirements]`, lab.libraries_requirements);
              formData.append(`modules[${i}][labs][${j}][packages_requirements]`, lab.packages_requirements);
            }
          }
        }


    if (this.editMode) {
      if (this.courseForm.get('plan').value == 'free') {
        formData.append('price', '0');
        console.log(this.courseForm.get('certified').value)
        // Update existing course
        this.courseService.updateCourse(this.courseId, localStorage.getItem('id'), formData, true, this.courseForm.get('certified').value).subscribe(
          res => {
            this.showNotification(
              'snackbar-success',
              "Your course has been updated successfully!",
              'bottom',
              'center'
            );
            this.loading = false;
            if(res.status == 'pending'){
              this.navigateToCoursesTab('my_pending_courses')
            }else{
              this.navigateToCoursesTab('my_available_courses')
            }
          },
          error => {
            this.loading = false;
            console.log(error);
            // handle error response
          }
        );
      } else {
        formData.append('price', this.courseForm.get('price').value);
        this.courseService.updateCourse(this.courseId, localStorage.getItem('id'), formData, false, this.courseForm.get('certified').value).subscribe(
          res => {
            console.log(res);
            this.showNotification(
              'snackbar-success',
              "Your course has been updated successfully!",
              'bottom',
              'center'
            );
            this.loading = false;
            if(res.status == 'pending'){
              this.navigateToCoursesTab('my_pending_courses')
            }else{
              this.navigateToCoursesTab('my_available_courses')
            }
          },
          error => {
            this.loading = false;

            console.log(error);
            // handle error response
          }
        );
      }

    } else {
      if (this.courseForm.get('plan').value == 'free') {
        formData.append('price', '0');
        this.courseService.createCourse(localStorage.getItem('id'), formData, true, this.courseForm.get('certified').value).subscribe(
          res => {
            console.log(res);
            this.showNotification(
              'snackbar-success',
              "Your request for adding this course is pending for admin approval !",
              'bottom',
              'center'
            );
            this.loading = false;
            if(res.status == 'pending'){
              this.navigateToCoursesTab('my_pending_courses')
            }else{
              this.navigateToCoursesTab('my_available_courses')
            }
          },
          error => {
            this.loading = false;
            this.showNotification(
              'snackbar-danger',
              error,
              'bottom',
              'center'
            );
            console.log(error);
            // handle error response
          }
        );
      } else {
        formData.append('price', this.courseForm.get('price').value);
        this.courseService.createCourse(localStorage.getItem('id'), formData, false, this.courseForm.get('certified').value).subscribe(
          res => {
            console.log(res);
            this.showNotification(
              'snackbar-success',
              "Your request for adding this course is pending for admin approval !",
              'bottom',
              'center'
            );
            this.loading = false;
            if(res.status == 'pending'){
              this.navigateToCoursesTab('my_pending_courses')
            }else{
              this.navigateToCoursesTab('my_available_courses')
            }
          },
          error => {
            this.loading = false;
            this.showNotification(
              'snackbar-danger',
              error,
              'bottom',
              'center'
            );
            console.log(error);
            // handle error response
          }
        );
      }
    }
  }

}
