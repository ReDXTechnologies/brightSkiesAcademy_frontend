import { NgModule, Optional, SkipSelf } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { DirectionService } from './service/direction.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import {DepartmentService} from "./service/department.service";
import {TeacherService} from "./service/teacher.service";
import {ReviewService} from "./service/review.service";
import {StudentService} from "./service/student.service";
import {AdminService} from "./service/admin.service";
import {CourseService} from "./service/course.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    DatePipe,
    RightSidebarService,
    AuthGuard,
    AuthService,
    DynamicScriptLoaderService,
    DirectionService,
    TeacherService,
    DepartmentService,
    TeacherService,
    ReviewService,
    StudentService,
    AdminService,
    CourseService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
