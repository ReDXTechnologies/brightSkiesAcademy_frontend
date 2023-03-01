import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../core/service/course.service";
import {Course} from "../../../core/models/course";

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.sass'],
})
export class AllCourseComponent implements OnInit {
  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];
  courses: Course[];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getApprovedCourses().subscribe(
      (data) => {
        console.log(data)
        this.courses = data;
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }
}
