import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
const routes: Routes = [

  {
    path: 'courses',
    component: AllCourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },

  {
    path: 'course-details',
    component: AboutCourseComponent
  },
  {
    path: 'Lab-course-details',
    component: LabCourseComponent
  },

  {
    path: 'settings',
    component: SettingsComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
