import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {ViewUploadedFilesComponent} from './view-uploaded-files/view-uploaded-files.component';


const routes: Routes = [
 {
    path: 'view',
    component: ViewUploadedFilesComponent,
  },
  {
    path: 'create',
    component: UploadFileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
