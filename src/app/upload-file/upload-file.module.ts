import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';


@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    UploadFileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UploadFileModule { }
