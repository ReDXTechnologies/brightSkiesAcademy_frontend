import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingAccountsComponent} from "./pending-accounts/pending-teachers-accounts/pending-accounts.component";
import {PendingCoursesComponent} from "./pending-courses/pending-courses/pending-courses.component";
import {
  PendingHybridProfilesComponent
} from "./pending-accounts/pending-hybrid-profile/pending-hybrid-profiles.component";
import {PendingEnrollementComponent} from "./pending-courses/pending-enrollement/pending-enrollement.component";
const routes: Routes = [
  {
    path: 'account-confirmation',
    component: PendingAccountsComponent
  },
  {
    path: 'hybrid-profile-confirmation',
    component: PendingHybridProfilesComponent
  },
  {
    path: 'course-confirmation',
    component: PendingCoursesComponent
  },
  {
    path: 'enrollement-confirmation',
    component: PendingEnrollementComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingApprovalRoutingModule {}
