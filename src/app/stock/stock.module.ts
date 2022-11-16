import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditStockComponent } from './edit-stock/edit-stock.component';


@NgModule({
  declarations: [ViewStockComponent, CreateItemComponent, EditStockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StockModule { }
