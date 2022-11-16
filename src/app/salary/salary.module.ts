import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { ViewSalaryComponent } from './view-salary/view-salary.component';
import { CreateSalaryComponent } from './create-salary/create-salary.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';


@NgModule({
  declarations: [ViewSalaryComponent, CreateSalaryComponent, EditSalaryComponent],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalaryModule { }
