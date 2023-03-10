import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from '../shared/components/components.module';
import {SettingsComponent} from "./settings/settings.component";
import {AllCourseComponent} from "./courses/all-course/all-course.component";
import {CoursevideoComponent} from "./courses/about-course/coursevideo/coursevideo.component";
import {CoursereviewComponent} from "./courses/about-course/coursereview/coursereview.component";
import {StudentfeedbackComponent} from "./courses/about-course/studentfeedback/studentfeedback.component";
import {CourseinstructorComponent} from "./courses/about-course/courseinstructor/courseinstructor.component";
import {CoursecurriculamComponent} from "./courses/about-course/coursecurriculam/coursecurriculam.component";
import {AboutCourseComponent} from "./courses/about-course/about-course.component";
import {LabCourseComponent} from "./courses/about-course/LabCourse/lab-course.component";
import {AddCourseComponent} from "./courses/add-course/add-course.component";
import {MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {FileUploadModule} from "ng2-file-upload";
import {EditCourseComponent} from "./courses/edit-course/edit-course.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
@NgModule({
  declarations: [
    SettingsComponent,
    AllCourseComponent,
    AboutCourseComponent,
    CoursecurriculamComponent,
    CourseinstructorComponent,
    StudentfeedbackComponent,
    CoursereviewComponent,
    CoursevideoComponent,
    LabCourseComponent,
    AddCourseComponent,
    EditCourseComponent

  ],
  imports: [
    CommonModule,
    ExtraPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    ComponentsModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    FileUploadModule,
    MatSnackBarModule
  ],
})
export class ExtraPagesModule {}
