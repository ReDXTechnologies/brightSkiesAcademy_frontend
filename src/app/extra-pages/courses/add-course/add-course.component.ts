import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {CourseService} from "../../../core/service/course.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../core/models/course";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class AddCourseComponent {
  isLinear = false;
  courseForm: UntypedFormGroup;
  selectedPlan = 'free';
  price: number;
  selectedStudentEmailsFile: File = null;
  selectedLabFiles: File = null;
  selectedImage: File = null;
  loading = false;
  submitted = false;
  canceled: boolean = false;
  course: Course;
  editMode: boolean = false;
  courseId: number;

  constructor(private fb: UntypedFormBuilder, private activatedRoute: ActivatedRoute,
              private courseService: CourseService, private _snackBar: MatSnackBar,
              private router: Router
  ) {
    const requiredForAdd = [Validators.required];
    const requiredForEdit = [];
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      course_id: [''],
      nbr_of_lessons: ['', [Validators.required]],
      description: ['', [Validators.required]],
      what_you_will_learn: ['', [Validators.required]],
      session_duration: ['', [Validators.required]],
      nb_sessions: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      price: [''],
      level: ['', [Validators.required]],
      vm_characteristics: ['', [Validators.required]],
      plan: ['free', Validators.required],
      certified: ['yes', Validators.required],
      workload: ['', [Validators.required]],
      student_emails_file: [''],
      labFiles: [''],
      image: [''],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params.courseId)
      if (params.edit && params.courseId) {
        this.editMode = true;
        this.courseId = params.courseId;
        this.courseService.getCourseById(this.courseId).subscribe(course => {
          console.log(course)
          this.course = course
          this.courseForm.patchValue({
            title: course.title,
            specialty: course.speciality,
            nbr_of_lessons: course.nbr_of_lessons,
            description: course.description,
            what_you_will_learn: course.what_you_will_learn,
            session_duration: course.session_duration,
            nb_sessions: course.nb_sessions,
            requirements: course.requirements,
            price: course.price,
            level: course.level,
            vm_characteristics: course.vm_characteristics,
            plan: course.free ? 'free' : 'paid',
            certified: course.certificate ? 'yes' : 'no',
            workload: course.workload,
            student_emails_file: this.editMode ? null : course.student_emails_file,
            labFiles: this.editMode ? null : course.labFiles,
            image: this.editMode ? null :course.image
          });
          if (this.editMode) {
            this.courseForm.get('labFiles').setValidators(requiredForEdit);
            this.courseForm.get('image').setValidators(requiredForEdit);
            this.courseForm.get('student_emails_file').setValidators(requiredForEdit);
          }
        });
      }
      console.log(this.editMode)

    });
  }

  isFormValid() {
    return this.courseForm && this.courseForm.valid;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, 'close', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onStudentEmailsFileSelected(event) {
    this.selectedStudentEmailsFile = <File>event.target.files[0];
  }

  onLabFilesSelected(event) {
    this.selectedLabFiles = event.target.files[0];
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
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
    formData.append('vm_characteristics', this.courseForm.get('vm_characteristics').value);
    formData.append('certificate', this.courseForm.get('certified').value);
    formData.append('workload', this.courseForm.get('workload').value);
    formData.append('session_duration', this.courseForm.get('session_duration').value);
    formData.append('nb_sessions', this.courseForm.get('nb_sessions').value);
    if (this.selectedStudentEmailsFile ) {
      formData.append('student_emails_file', this.selectedStudentEmailsFile);
    }
    if (this.selectedLabFiles ) {
      formData.append('labFiles', this.selectedLabFiles, this.selectedLabFiles.name);
    }
    if (this.selectedImage ) {
      formData.append('image', this.selectedImage);
    }
    if (this.canceled) {
      this.loading = false;
      return;
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

            console.log(error);
            // handle error response
          }
        );
      }
    }
  }

}
