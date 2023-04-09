import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import {InstructorpromainComponent} from "./teacherProfile/instructorpromain.component";

const routes: Routes = [
  {
    path: 'all-teachers',
    component: AllTeachersComponent,
  },
  {
    path: 'about-teacher/:id',
    component: InstructorpromainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
