import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class AddCourseComponent {
  courseForm: UntypedFormGroup;
  selectedPlan = 'free';
  price: number;
  isLinear = false;

  constructor(private fb: UntypedFormBuilder) {
    this.courseForm = this.fb.group({
      cName: ['', [Validators.required]],
      courseField: ['', [Validators.required]],
      nbrLessons: [''],
      courseDetails: ['', [Validators.required]],
      courseRequirements: ['', [Validators.required]],
      sDate: ['', [Validators.required]],
      cTyme: ['', [Validators.required]],
      cPrice: ['', [Validators.required]],
      courseLevel: ['', [Validators.required]],
      maxStds: [''],
      contactNo: ['', [Validators.required]],
      uploadEmailsFile: [''],
      uploadLabFiles: [''],
      uploadCourseImage: [''],
      plan: ['free', Validators.required],
      certified: ['yes', Validators.required],
      coursePrice: ['',[Validators.required]],
    });
  }


  selectFree() {
    this.selectedPlan = 'free';
  }

  selectPremium() {
    this.selectedPlan = 'premium';
  }
  onSubmit() {
    console.log('Form Value', this.courseForm.value);
  }
}
