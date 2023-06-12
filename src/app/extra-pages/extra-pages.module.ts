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
import {AcademyComponent} from "./courses/academy/academy.component";
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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {
  BottomSheetComponent,
  BottomSheetOverviewExampleSheetComponent
} from "./courses/add-course/bottom-sheet/bottom-sheet.component";
import {MatListModule} from "@angular/material/list";
import { MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgScrollbarModule} from "ngx-scrollbar";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {Instance_guidanceComponent} from "./courses/add-course/instances_guide/instance_guidance.component";
import {MatDialogModule} from "@angular/material/dialog";
import {
  DisplayCurriculumVideosComponent
} from "./courses/about-course/displayCurriculumVideos/displayCurriculumVideos.component";
import {EditCourseModuleComponent} from "./courses/about-course/LabCourse/edit/edit-course-overview/form-dialog.component";
import {AddNewModule} from "./courses/about-course/LabCourse/edit/add-new-module/add-new-module.component";
import {AddVideoComponent} from "./courses/about-course/coursecurriculam/edit/add-video/add-video.component";
import {AddLabComponent} from "./courses/about-course/coursecurriculam/edit/add-lab/add-lab.component";
import {DeleteVideoLabDialogComponent} from "./courses/about-course/coursecurriculam/edit/delete/delete.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ChangeBgDirective} from "./courses/add-course/change-bg.directives";
import {AddQuizzComponent} from "./courses/about-course/coursecurriculam/edit/add-quizz/add-quizz.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {StartQuizzComponent} from "./courses/about-course/coursecurriculam/start-quizz/start-quizz.component";
import {NgxGaugeModule} from "ngx-gauge";
import { StartCourseComponent } from './courses/start-course/start-course.component';
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
    BottomSheetOverviewExampleSheetComponent,
    BottomSheetComponent,
    Instance_guidanceComponent,
    DisplayCurriculumVideosComponent,
    EditCourseModuleComponent,
    AddNewModule,
    AddQuizzComponent,
    AddVideoComponent,
    AddLabComponent,
    DeleteVideoLabDialogComponent,
    ChangeBgDirective,
    StartQuizzComponent,
    StartCourseComponent,



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
        MatSnackBarModule,
        MatStepperModule,
        MatListModule,
        MatBottomSheetModule,
        MatSidenavModule,
        NgScrollbarModule,
        CdkDropList,
        CdkDragHandle,
        CdkDrag,
        MatDialogModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NgxGaugeModule,
        AcademyComponent


    ],
})
export class ExtraPagesModule {}
