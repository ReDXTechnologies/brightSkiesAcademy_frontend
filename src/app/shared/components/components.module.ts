import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import {PaginationComponent} from "./pagination/pagination.component";
import { UploadPictureComponent } from './upload-picture/upload-picture.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent,PaginationComponent, UploadPictureComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, PaginationComponent, UploadPictureComponent],
})
export class ComponentsModule {}
