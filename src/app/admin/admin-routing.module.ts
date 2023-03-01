import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'pending',
    loadChildren: () =>
      import('./pending-approval/pending-approval.module').then((m) => m.PendingApprovalModule),
  },
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.module').then((m) => m.FeesModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
