import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Teacher} from "../../../core/models/teacher";
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Course} from "../../../core/models/course";

@Component({
  selector: 'app-instructorpromain',
  templateUrl: './instructorpromain.component.html',
  styleUrls: ['./instructorpromain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorpromainComponent implements OnInit {
  followedActive: boolean = false;
  btnVal = "Follow";

  followedClick() {
    if (this.followedActive == false) {
      this.followedActive = true;
      this.btnVal = "Followed"
    } else {
      this.followedActive = false;
      this.btnVal = "Follow"
    }
  }

  teacher: Teacher;
  courses : Course[]
teacherId : number;
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {
  }

  ngOnInit(): void {
    this.teacherId = +this.route.snapshot.paramMap.get('id'); // Get the id parameter from the route and convert it to a number using the + operator
    this.getTeacherInfos();
    this.getTeacherCourses();
  }

  getTeacherInfos() {
    this.teacherService.getTeacherById(this.teacherId).subscribe(res => {
      this.teacher = res;
    })
  }
  getTeacherCourses() {
    // const id = +this.route.snapshot.paramMap.get('id'); // Get the id parameter from the route and convert it to a number using the + operator
    // this.teacherService.getApprovedCourses(id).subscribe(res => {
    //   this.courses = res;
    // })
  }
}
