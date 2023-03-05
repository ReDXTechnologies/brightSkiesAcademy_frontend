import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingAccountsComponent} from "./pending-accounts/pending-accounts.component";
import {PendingCoursesComponent} from "./pending-courses/pending-courses.component";
const routes: Routes = [
  {
    path: 'account-confirmation',
    component: PendingAccountsComponent
  },
  {
    path: 'course-confirmation',
    component: PendingCoursesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingApprovalRoutingModule {}
