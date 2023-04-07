import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { AddSuperDepartmentComponent } from './add-super-department/add-super-department.component';
import {AddSubDepartmentComponent} from "./add-sub-department/add-sub-department.component";
import {HeadDepProfileComponent} from "./head-dep-profile/head-dep-profile.component";

const routes: Routes = [
  {
    path: 'all-departments',
    component: AllDepartmentsComponent
  },
  {
    path: 'add-sub-department',
    component: AddSubDepartmentComponent
  },
  {
    path: 'add-super-department',
    component: AddSuperDepartmentComponent
  },
  {
    path: 'head-department-profile',
    component: HeadDepProfileComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {}
