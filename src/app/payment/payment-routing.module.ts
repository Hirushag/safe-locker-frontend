import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'view' },
    {
      path: 'view',
      component: ViewPaymentComponent,
    },
     {
       path: 'create',
       component: CreatePaymentComponent,
     },
     {
      path: 'edit',
      component: EditPaymentComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
