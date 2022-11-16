import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';


@NgModule({
  declarations: [ViewPaymentComponent, CreatePaymentComponent, EditPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaymentModule { }
