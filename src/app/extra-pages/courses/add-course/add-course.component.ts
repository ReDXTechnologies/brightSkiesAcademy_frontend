import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {CourseService} from "../../../core/service/course.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class AddCourseComponent {
  courseForm: UntypedFormGroup;
  selectedPlan = 'free';
  price: number;
  selectedStudentEmailsFile: File = null;
  selectedLabFiles: File = null;
  selectedImage: File = null;

  constructor(private fb: UntypedFormBuilder, private courseService: CourseService,    private _snackBar: MatSnackBar,
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      nbr_of_lessons: ['',[Validators.required]],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      price: [''],
      level: ['', [Validators.required]],
      vm_characteristics: ['',[Validators.required]],
      plan: ['free', Validators.required],
      certified: ['yes', Validators.required],
      workload: ['', [Validators.required]],
      student_emails_file: [''],
      labFiles: [''],
      image: [''],
    });
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
  loading = false;
  submitted = false;

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.courseForm.get('title').value);
    formData.append('speciality', this.courseForm.get('specialty').value);
    formData.append('nbr_of_lessons', this.courseForm.get('nbr_of_lessons').value);
    formData.append('description', this.courseForm.get('description').value);
    formData.append('requirements', this.courseForm.get('requirements').value);
    formData.append('level', this.courseForm.get('level').value);
    formData.append('vm_characteristics', this.courseForm.get('vm_characteristics').value);
    formData.append('certificate', this.courseForm.get('certified').value);
    formData.append('workload', this.courseForm.get('workload').value);
    formData.append('student_emails_file', this.selectedStudentEmailsFile);
    formData.append('labFiles', this.selectedLabFiles, this.selectedLabFiles.name);
    formData.append('image', this.selectedImage);
    if (this.courseForm.get('plan').value == 'free') {
      formData.append('price', '0');
      this.submitted = true;
      this.loading = true;
      this.courseService.createCourse(localStorage.getItem('id'), formData, true,this.courseForm.get('certified').value).subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.showNotification(
              'snackbar-success',
              "Your request for adding this course is pending for admin approval !",
              'bottom',
              'center'
            );
            this.loading = false;
          }, 1000);
          // this.router.navigateByUrl('sessions/signin3');
          // handle successful response
        },
        error => {
          console.log(error);
          // handle error response
        }
      );
    } else {
      formData.append('price', this.courseForm.get('price').value);
      this.courseService.createCourse(localStorage.getItem('id'), formData, false,this.courseForm.get('certified').value).subscribe(
        res => {console.log(res);
          setTimeout(() => {
            this.showNotification(
              'snackbar-success',
              "Your request for adding this course is pending for admin approval !",
              'bottom',
              'center'
            );
            this.loading = false;
          }, 1000);
          // this.router.navigateByUrl('sessions/signin3');
          // handle successful response
        },
        error => {
          console.log(error);
          // handle error response
        }
      );
    }
  }

}
