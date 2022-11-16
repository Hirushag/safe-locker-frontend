import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { ViewUtilityComponent } from './view-utility/view-utility.component';
import { CreateUtilityComponent } from './create-utility/create-utility.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditUtilityComponent } from './edit-utility/edit-utility.component';


@NgModule({
  declarations: [ViewUtilityComponent, CreateUtilityComponent, EditUtilityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    UtilityRoutingModule
  ]
})
export class UtilityModule { }
