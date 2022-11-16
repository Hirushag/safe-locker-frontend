import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    ReactiveFormsModule
  ]
})
export class FinanceModule { }
