import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { PendingApprovalRoutingModule } from './pending-approval-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {DeleteDialogComponent} from "./pending-accounts/delete/delete.component";
import {PendingAccountsComponent} from "./pending-accounts/pending-teachers-accounts/pending-accounts.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SharedModule} from "../../shared/shared.module";
import {ComponentsModule} from "../../shared/components/components.module";
import {PendingCoursesFeesComponent} from "./pending-courses/pending-courses-fees/pending-courses-fees.component";
import {CourseDetailsComponent} from "./pending-courses/form/course-details.component";
import {MatCardModule} from "@angular/material/card";
import {DeleteComponent} from "./pending-courses/delete/delete.component";
import {SelectDepartmentComponent} from "./pending-accounts/affect-Department/select-department.component";
import {PendingCoursesComponent} from "./pending-courses/pending-courses/pending-courses.component";
import {
  PendingHybridProfilesComponent
} from "./pending-accounts/pending-hybrid-profile/pending-hybrid-profiles.component";
import {PendingEnrollementComponent} from "./pending-courses/pending-enrollement/pending-enrollement.component";
@NgModule({
  declarations: [
    DeleteDialogComponent,
    PendingAccountsComponent,
    PendingCoursesFeesComponent,
    CourseDetailsComponent,
    DeleteComponent,
    SelectDepartmentComponent,
    PendingCoursesComponent,
    PendingEnrollementComponent,
    PendingHybridProfilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatTableExporterModule,
    PendingApprovalRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatCardModule,
  ],
  providers: [],
})
export class PendingApprovalModule {}
