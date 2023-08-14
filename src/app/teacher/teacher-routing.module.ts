import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TeacherProfileComponent} from "./teacher-profile/teacher-profile.component";
import {MyStudentsComponent} from "./students/all-students/my-students.component";
import {DashboardComponent} from "../student/dashboard/dashboard.component";
// import {MyStudentsComponent} from "./all-students/my-students.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'teacher-profile',
    component: TeacherProfileComponent,
  },
  {
    path: 'students',
    component: MyStudentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
