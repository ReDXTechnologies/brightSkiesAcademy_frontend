import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlankComponent } from './blank/blank.component';
import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {EditCourseComponent} from "./courses/edit-course/edit-course.component";
const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'courses',
    component: AllCourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },
  {
    path: 'edit-course',
    component: EditCourseComponent
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
    path: 'invoice',
    component: InvoiceComponent
  },

  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.module').then((m) => m.AttendanceModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
