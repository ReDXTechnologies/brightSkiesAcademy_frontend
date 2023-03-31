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
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { AddSuperDepartmentComponent } from './add-super-department/add-super-department.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DeleteDialogComponent } from './all-departments/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-departments/dialogs/form-dialog/form-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from './../../shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {AddSubDepartmentComponent} from "./add-sub-department/add-sub-department.component";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AddSuperDepartmentComponent,
    AllDepartmentsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AddSubDepartmentComponent
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
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    DepartmentsRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatTabsModule,
  ],
  providers: [],
})
export class DepartmentsModule {}
