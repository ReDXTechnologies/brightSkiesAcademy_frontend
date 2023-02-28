import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.sass'],
})
export class EditCourseComponent {
  courseForm: UntypedFormGroup;
  formdata = {
    cName: 'High Performance Computing Fundamentals',
    sDate: '2020-02-17T14:22:18Z',
    cTyme: '10:30',
    pName: '2',
    maxStds: '130',
    contactNo: '1234567890',
    uploadFile: '',
    courseField: 'HPC openMP',
    nbrLessons: "4",
    courseDetails: "this course has been designed by two professional Data Scientists so that we can\n" +
      "              share our knowledge and help you learn complex theory, algorithms, and coding\n" +
      "              libraries in a simple way. We will walk you step-by-step into the World of Machine\n" +
      "              Learning. With every tutorial, you will develop new skills and improve your\n" +
      "              understanding of this challenging yet lucrative sub-field of Data Science",
    courseRequirements: " High School Mathematics Level\n" +
      "                Basic Python Knowledge Required\n" +
      "                Broadband Internet",
    courseLevel: 'beginner',
    uploadEmailsFile:"",
    uploadLabFiles: "",
    uploadCourseImage: "",
    plan: ['free', Validators.required],
    certified: ['yes', Validators.required],
    coursePrice: "0",
  };

  constructor(private fb: UntypedFormBuilder) {
    this.courseForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.courseForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      cName: [this.formdata.cName, [Validators.required]],
      sDate: [this.formdata.sDate, [Validators.required]],
      cTyme: [this.formdata.cTyme, [Validators.required]],
      pName: [this.formdata.pName, [Validators.required]],
      maxStds: [this.formdata.maxStds],
      courseField: [this.formdata.courseField, [Validators.required]],
      nbrLessons: [this.formdata.nbrLessons, [Validators.required]],
      contactNo: [this.formdata.contactNo, [Validators.required]],
      courseLevel: [this.formdata.courseLevel, [Validators.required]],
      uploadLabFiles: [this.formdata.uploadLabFiles, [Validators.required]],
      uploadEmailsFile: [this.formdata.uploadEmailsFile, [Validators.required]],
      uploadCourseImage: [this.formdata.uploadCourseImage, [Validators.required]],
      courseRequirements: [this.formdata.courseRequirements, [Validators.required]],
      courseDetails: [this.formdata.courseDetails, [Validators.required]],
      coursePrice: [this.formdata.coursePrice, [Validators.required]],
      plan: [this.formdata.plan, [Validators.required]],
      uploadFile: [this.formdata.uploadFile],
    });
  }
}
