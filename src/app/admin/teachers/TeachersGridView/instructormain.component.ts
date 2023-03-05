import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TeacherService} from "../../../core/service/teacher.service";
import {Teacher} from "../../../core/models/teacher";

@Component({
  selector: 'app-instructormain',
  templateUrl: './instructormain.component.html',
  styleUrls: ['./instructormain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructormainComponent implements OnInit {

  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(
      (teachers: Teacher[]) => {
        this.teachers = teachers;
        console.log(this.teachers)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
