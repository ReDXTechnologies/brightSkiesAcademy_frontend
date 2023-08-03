import {inject, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {AcademyDetailsComponent} from "./courses/about-course/details/details.component";
import {RoadmapComponent} from "./courses/roadmap/roadmap.component";
import {HomeComponent} from "./home/home.component";
import {RoadmapDisplayComponent} from "./courses/roadmap-display/roadmap-display.component";
import {DepartmentDetailsComponent} from "./departments/department-details/department-details.component";
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
    path: 'Roadmap',
    component: RoadmapComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'roadmapDisplay',
    component: RoadmapDisplayComponent
  },
  {
    path: 'department',
    component: DepartmentDetailsComponent
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
