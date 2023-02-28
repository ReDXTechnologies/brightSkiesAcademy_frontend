import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import {StudentAttendanceComponent} from "./student-attendance/student-attendance.component";
import {DeleteDialogComponent} from "./student-attendance/dialogs/delete/delete.component";
import {FormDialogComponent} from "./student-attendance/dialogs/form-dialog/form-dialog.component";
import {MatTableExporterModule} from "mat-table-exporter";
import {StudentAttendanceService} from "./student-attendance/attendance.service";

@NgModule({
  declarations: [
    AttendanceSheetComponent,
    AttendanceDetailComponent,
    StudentAttendanceComponent,
    DeleteDialogComponent,
    FormDialogComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
  ],
  providers: [StudentAttendanceService],
})
export class AttendanceModule {}
