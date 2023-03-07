import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import {TeacherProfileComponent} from "./teacher-profile/teacher-profile.component";
import {MyStudentsComponent} from "./students/all-students/my-students.component";
// import {MyStudentsComponent} from "./all-students/my-students.component";

const routes: Routes = [
  {
    path: 'teacher-profile',
    component: TeacherProfileComponent,
  },
  {
    path: 'students',
    component: MyStudentsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
