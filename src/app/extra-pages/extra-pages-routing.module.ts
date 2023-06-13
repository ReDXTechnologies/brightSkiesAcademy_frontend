import {inject, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {AcademyDetailsComponent} from "./courses/about-course/details/details.component";
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
    path: 'Lab-course-academy',
    component: AcademyDetailsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  // {
  //   path     : 'ibra',
  //   pathMatch: 'full',
  //   component: AcademyDetailsComponent
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
