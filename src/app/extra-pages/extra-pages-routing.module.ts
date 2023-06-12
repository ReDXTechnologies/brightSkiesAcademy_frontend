import {inject, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {AcademyComponent} from "./courses/academy/academy.component";
import {AcademyListComponent} from "./courses/academy/list/list.component";
import {AcademyService} from "./courses/academy/academy.service";
import {AcademyDetailsComponent} from "./courses/academy/details/details.component";
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
  {
    path     : 'ibra',
    pathMatch: 'full',
    component: AcademyDetailsComponent
  },
  {
    path     : 'imen',
    pathMatch: 'full',
    component: AcademyListComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
