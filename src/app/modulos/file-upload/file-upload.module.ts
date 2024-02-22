import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FileUploadRequestComponent } from './file-upload-request/file-upload-request.component';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';
import { FileUploadComponent } from './file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadFormComponent,
    FileUploadRequestComponent
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    ReactiveFormsModule
  ]
})
export class FileUploadModule { }
