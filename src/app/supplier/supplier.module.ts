import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';



@NgModule({
  declarations: [ViewSupplierComponent, CreateSupplierComponent, EditSupplierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
