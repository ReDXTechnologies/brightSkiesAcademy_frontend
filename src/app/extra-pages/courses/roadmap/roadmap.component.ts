import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../core/service/course.service';
import { AuthService } from '../../../core/service/auth.service';
import { DepartmentService } from '../../../core/service/department.service';
import { Course } from '../../../core/models/course';
import { Department } from '../../../core/models/department';
import {MatSnackBar} from "@angular/material/snack-bar";

interface SubDepartment {
  name: string;
}

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
  depName = '';
  roadmapTitle: string;
  courseForm: FormGroup;
  courses: Course[] = [];
  selectedChoice: boolean;
  selectedSubDepartment: Department;
  selectedSuperDepartment: Department;
  selectedCourses: Course[] = [];
  userId: number;
  user_id: string;
  role: any;
  departments: SubDepartment[] = [];
  supDepartments: Department[] = [];
  searchInput = '';

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
  ) {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id, 10);
    this.role = this.authService.currentUserValue.role[0];

    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // if (this.role === 'head_sub_department') {
    //   this.departmentService.getSubDepByUserId(this.userId).subscribe((subDep: SubDepartment[]) => {
    //     this.depName = subDep[0].name;
    //   });
    if (this.role === 'head_super_department') {
      this.getSupDepartments();
    } else if (this.role === 'Super_Admin' || this.role === 'Admin') {
      this.getAllSupDepartments();
    }
  }

  private async getSupDepartments() {
    const dep: Department[] = await this.departmentService.getSuperDepByUserId(this.userId).toPromise();
    if (dep.length > 0) {
      this.departments = await this.departmentService.getSubDepartmentsBySuperDepId(dep[0].id).toPromise();
    }
  }

  private async getAllSupDepartments() {
    const dep: Department[] = await this.departmentService.getSuperDepartments().toPromise();
    this.supDepartments.push(...dep);
  }

  onSearch(query: string) {
    this.searchInput = query;
    this.getFilteredCourses();
    this.selectedCourses = [];
  }

  async getFilteredCourses() {
    this.courses = await this.courseService.getFilteredCourses(
        [this.selectedSubDepartment.toString()],
        '',
        '',
        '',
        '',
        this.searchInput).toPromise();
    this.courses = this.courses.map((course) => ({
      ...course,
      checked: this.isCourseSelected(course),
    }));
  }


  selectDepartment(dep: Department) {
    this.selectedSubDepartment = dep;
    this.getFilteredCourses();
  }

  selectSuperDepartment(dep: Department) {
    this.selectedSuperDepartment = dep;
    this.selectedCourses = [];
    this.courses = [];
    this.departmentService.getSubDepartmentsBySuperDepId(dep.id).subscribe((value: SubDepartment[]) => {
      this.departments = value;
    });
  }

  onCourseChange(event: any, course: any): void {
    if (event.target.checked) {
      course.checked = true;
      this.selectedCourses.push(course);
      //console.log(this.selectedCourses)
    } else {
      const index = this.selectedCourses.findIndex((selectedCourse) => selectedCourse.id === course.id);
      if (index > -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
  }

  isCourseSelected(course: Course): boolean {
    return this.selectedCourses.some((selectedCourse) => selectedCourse.id === course.id);
  }

  onChoiceChange(event: any) {
    this.selectedChoice = event.target.value;
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  submitRoadmap() {
    const sentCoursesIds = this.selectedCourses.map((el1) => el1.id);
    const roadmapData = {
      title: this.roadmapTitle,
      courses: sentCoursesIds,
      certified: this.selectedChoice
    };
    this.courseService.addRoadmap(roadmapData).subscribe(
      (result) => {
        if (result.hasOwnProperty('message')) {
          this.showNotification('snackbar-success', result.message, 'center', 'center');
        } else if (result.hasOwnProperty('error') && result.error === 'title already exists') {
          this.showNotification('snackbar-danger', 'Title already exists', 'center', 'center');
        }
      },
      (error) => {
        // Handle any error that occurs during the API call
        console.error('Error adding roadmap:', error);
      }
    );
  }
}
