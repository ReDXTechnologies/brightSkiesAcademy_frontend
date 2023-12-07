import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {Course} from "../../../../../../core/models/course";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class EditCourseModuleComponent implements OnInit {
  action: string;
  dialogTitle: string;
  courseForm: UntypedFormGroup;
  course: Course
  selectedSlides: File = null;
  selectedImage: File = null;

  // @ts-ignore


  constructor(
    public dialogRef: MatDialogRef<EditCourseModuleComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.dialogTitle = data.course.name;
    this.course = data.course

    this.courseForm = this.createContactForm();
  }

  ngOnInit(): void {
  }

  onImageSelected(event) {
    this.selectedImage = (event.target.files[0] as File);
  }

  onSlidesSelected(event) {
    this.selectedSlides = (event.target.files[0] as File);
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
    console.log(this.course)
    return this.fb.group({
      title: this.course.title,
      specialty: this.course.speciality,
      nbr_of_lessons: this.course.nbr_of_lessons,
      description: this.course.description,
      course_id: this.course.id,
      what_you_will_learn: this.course.what_you_will_learn,
      requirements: this.course.requirements,
      price: this.course.price,
      level: this.course.level,
      plan: this.course.free ? 'free' : 'paid',
      certified: this.course.certificate ? 'yes' : 'no',
      workload: this.course.workload,
      slides: this.course.labFiles,
      image: this.course.image,
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable

  public confirm(): void {

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
    formData.append('course_id ', this.courseForm.get('course_id').value);
    if (this.selectedSlides) {
      formData.append('slides', this.selectedSlides, this.selectedSlides.name);
      console.log(this.selectedSlides);
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    if (this.courseForm.get('plan').value == 'free') {
      formData.append('price', '0');
    }else{
      formData.append('price', this.courseForm.get('price').value);
    }

    const data = {
      formData
    };
    console.log(data);

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(data);

  }
}
