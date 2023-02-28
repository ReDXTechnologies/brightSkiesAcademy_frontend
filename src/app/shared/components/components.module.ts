import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import {PaginationComponent} from "./pagination/pagination.component";

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent,PaginationComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, PaginationComponent],
})
export class ComponentsModule {}
