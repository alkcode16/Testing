import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';

const routes: Routes = [
  {path: 'form', component: FileUploadFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
