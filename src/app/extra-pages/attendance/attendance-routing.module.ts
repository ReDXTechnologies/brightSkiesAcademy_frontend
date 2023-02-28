import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import {Page404Component} from "../../authentication/page404/page404.component";
import {StudentAttendanceComponent} from "./student-attendance/student-attendance.component";

const routes: Routes = [
  {
    path: 'students-attendance',
    component: StudentAttendanceComponent,
  },
  {
    path: 'details',
    component: AttendanceDetailComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
