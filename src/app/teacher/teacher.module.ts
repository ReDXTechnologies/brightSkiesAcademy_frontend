import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import {TeacherProfileComponent} from "./teacher-profile/teacher-profile.component";
import {MatTabsModule} from "@angular/material/tabs";
import {FileUploadModule} from "ng2-file-upload";
import {MyStudentsComponent} from "./students/all-students/my-students.component";
import {FormDialogComponent} from "./students/all-students/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./students/all-students/dialogs/delete/delete.component";
import {StudentsService} from "./students/all-students/students.service";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    TeacherProfileComponent,
    MyStudentsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
    imports: [
        CommonModule,
        TeacherRoutingModule,
        chartjsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        FormsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        MatIconModule,
        MatButtonModule,
        NgApexchartsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatDialogModule,
        MatMenuModule,
        MatSortModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatTableExporterModule,
        MatProgressSpinnerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        ComponentsModule,
        SharedModule,
        MatTabsModule,
        FileUploadModule,
        MatStepperModule,
    ],
  providers: [StudentsService],
})
export class TeacherModule {}
