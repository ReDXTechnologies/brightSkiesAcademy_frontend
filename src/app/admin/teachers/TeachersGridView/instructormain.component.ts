import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TeacherService} from "../../../core/service/teacher.service";
import {Teacher} from "../../../core/models/teacher";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-instructormain',
  templateUrl: './instructormain.component.html',
  styleUrls: ['./instructormain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructormainComponent implements OnInit {

  teachers: Teacher[] = [];
  userId : number;
  user_id: string;
  role: any
  constructor(private teacherService: TeacherService,    private authService: AuthService,
  ) {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];
  }

  ngOnInit(): void {
    if (this.role === 'Super_Admin') {
      this.teacherService.getTeachers().subscribe(
        (teachers: Teacher[]) => {
          this.teachers = teachers;
          console.log(this.teachers)
        },
        (error) => {
          console.error(error);
        }
      );    }
    else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res=>{
        console.log("**************************************",res.valueOf())
        this.teacherService.getSuperDepTeachers(res).subscribe(
          (teachers: Teacher[]) => {
            this.teachers = teachers;
            console.log(this.teachers)
          },
          (error) => {
            console.error(error);
          }
        );
      })

    }else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res=>{
        console.log("**************************************",res.valueOf())
        this.teacherService.getSubDepTeachers(res).subscribe(
          (teachers: Teacher[]) => {
            this.teachers = teachers;
            console.log(this.teachers)
          },
          (error) => {
            console.error(error);
          }
        );
      })

    }

  }
}
