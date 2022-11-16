import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
// export class PaymentService {

//   constructor() { }
// }
export class PaymentService {

  constructor(private apiService: MainApiService) { }

  getAllPayments() {
    return this.apiService.get('/payment/');
  }

 registerPayment(payment){

  return this.apiService.post('/payment/',payment);

 }
 deletePayment(paymentId){
   return this.apiService.delete('/payment/'+paymentId);
 }

 editPayment(paymentId,payment){

  return this.apiService.put('/payment/'+paymentId,payment);
 }

 getPaymentById(paymentId){

  return this.apiService.get('/payment/payment',{paymentId});

 }

}
