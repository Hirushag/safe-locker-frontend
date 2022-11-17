import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import { ViewUploadedFilesComponent } from './view-uploaded-files/view-uploaded-files.component';


@NgModule({
  declarations: [UploadFileComponent, ViewUploadedFilesComponent],
  imports: [
    CommonModule,
    UploadFileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UploadFileModule { }
