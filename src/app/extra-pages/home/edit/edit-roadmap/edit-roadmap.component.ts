import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Course} from "../../../../core/models/course";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import { CourseService } from 'src/app/core/service/course.service';
import {combineLatest, Subscription} from "rxjs";
import {DepartmentService} from "../../../../core/service/department.service";

@Component({
  selector: 'app-edit-roadmap',
  templateUrl: './edit-roadmap.component.html',
  styleUrls: ['./edit-roadmap.component.scss']
})
export class EditRoadmapComponent implements OnInit{
  action: string;
  dialogTitle: string;
  courseForm: UntypedFormGroup;
  courses: Course[] = [];
  roadmapCertified: boolean;
  selectedSlides: File = null;
  selectedImage: File = null;
  selectedCourses: Course[] = [];
  selectedChoice: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService,
    public dialogRef: MatDialogRef<EditRoadmapComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.dialogTitle = data.name;
    this.selectedChoice = data.certified;

    console.log(data.coursesId)
    data.coursesId.map((el1) => this.courseService.getCourseById(el1).subscribe((result) => {
      this.onCourseChange({ target: { checked: true } }, result);
    }));
    this.departmentService.getSuperDepartmentByCourseId(data.coursesId[0]).subscribe(async (el1) => {
            this.departmentService.getSubDepartmentsBySuperDepId(el1.id).subscribe((el2) => {
              const subDep: string[] = [el2.map((res) => res.name).toString()];
              this.courseService.getFilteredCourses(
                subDep,
                '',
                '',
                '',
                '',
                ''
              ).subscribe((el3) => {
                this.courses = el3.map((course) => ({
                  ...course,
                  checked: data.coursesId.includes(course.id),
                }));
              });
            });
          });
    this.courseForm = this.createContactForm();
  }

  ngOnInit(): void {
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  onSlidesSelected(event) {
    this.selectedSlides = <File>event.target.files[0];
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
    return this.fb.group({
      title: this.dialogTitle,
    });
  }
  onCourseChange(event: any, course: Course): void {
    if (event.target.checked) {
      this.selectedCourses.push(course);
      console.log(this.selectedCourses)
    } else {
      const index = this.selectedCourses.findIndex((selectedCourse) => selectedCourse.id === course.id);
      if (index > -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
  }
  onChoiceChange(event: any) {
    this.selectedChoice = event.target.value;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable
  isButtonEnabled(): boolean {
    const titleValue = this.courseForm.get('title').value;
    const selectedCoursesLength = this.selectedCourses.length;
    return !!titleValue && selectedCoursesLength !== 0;
  }
  public confirm(): void {
    const sentCoursesIds = this.selectedCourses.map((el1) => el1.id);
    const roadmapData = {
      oldTitle: this.dialogTitle,
      title:  this.courseForm.get('title').value,
      courses: sentCoursesIds,
      certified: this.selectedChoice,
    };
    console.log(roadmapData);
    this.courseService.updateRoadmap(roadmapData).subscribe((result) => {
      window.location.reload();
    });
  }
}
